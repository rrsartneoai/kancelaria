-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- Create custom types
CREATE TYPE user_role AS ENUM ('client', 'lawyer', 'admin', 'operator');
CREATE TYPE subscription_status AS ENUM ('trial', 'active', 'past_due', 'canceled', 'unpaid');
CREATE TYPE payment_status AS ENUM ('pending', 'succeeded', 'failed', 'canceled');

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    phone TEXT,
    role user_role DEFAULT 'client',
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Specializations table
CREATE TABLE specializations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Law firms table
CREATE TABLE law_firms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    tax_number TEXT NOT NULL UNIQUE,
    krs_number TEXT UNIQUE,
    description TEXT,
    
    -- Address (embedded)
    street TEXT NOT NULL,
    city TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    country TEXT DEFAULT 'PL',
    
    -- Contact info
    phone TEXT,
    email TEXT,
    website TEXT,
    
    -- Business details
    founded_date DATE,
    business_hours JSONB,
    
    -- Owner/Admin user
    owner_id UUID REFERENCES users(id),
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    
    -- Search optimization
    search_vector tsvector,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lawyers table
CREATE TABLE lawyers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    law_firm_id UUID NOT NULL REFERENCES law_firms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    title TEXT, -- dr, prof, adw, r.pr.
    email TEXT,
    phone TEXT,
    bar_number TEXT UNIQUE, -- Numer wpisu na listę adwokatów
    
    bio TEXT,
    avatar_url TEXT,
    
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Junction table for law firm specializations
CREATE TABLE law_firm_specializations (
    law_firm_id UUID REFERENCES law_firms(id) ON DELETE CASCADE,
    specialization_id UUID REFERENCES specializations(id) ON DELETE CASCADE,
    PRIMARY KEY (law_firm_id, specialization_id)
);

-- Subscriptions table
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    law_firm_id UUID NOT NULL REFERENCES law_firms(id) ON DELETE CASCADE,
    
    plan_name TEXT NOT NULL,
    status subscription_status DEFAULT 'trial',
    
    price_monthly DECIMAL(10,2),
    price_yearly DECIMAL(10,2),
    
    current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
    current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    
    -- Stripe integration
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    
    -- Usage limits
    api_calls_limit INTEGER DEFAULT 1000,
    api_calls_used INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subscription_id UUID NOT NULL REFERENCES subscriptions(id),
    
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'PLN',
    status payment_status DEFAULT 'pending',
    
    -- Stripe integration
    stripe_payment_intent_id TEXT,
    stripe_invoice_id TEXT,
    
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- API usage tracking
CREATE TABLE api_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    law_firm_id UUID REFERENCES law_firms(id),
    
    endpoint TEXT NOT NULL,
    method TEXT NOT NULL,
    status_code INTEGER NOT NULL,
    response_time_ms INTEGER,
    
    user_agent TEXT,
    ip_address INET,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Search analytics
CREATE TABLE search_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    query TEXT,
    city TEXT,
    specializations TEXT[],
    results_count INTEGER NOT NULL,
    
    user_id UUID REFERENCES users(id),
    ip_address INET,
    user_agent TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default specializations
INSERT INTO specializations (name, code, description) VALUES
('Prawo Gospodarcze', 'COMMERCIAL', 'Obsługa prawna przedsiębiorstw, umowy handlowe, fuzje i przejęcia'),
('Prawo Cywilne', 'CIVIL', 'Sprawy cywilne, rodzinne, spadkowe, nieruchomości'),
('Prawo Karne', 'CRIMINAL', 'Obrona w sprawach karnych, postępowania karne'),
('Prawo Pracy', 'LABOR', 'Stosunki pracy, spory pracownicze, mobbing'),
('Prawo Administracyjne', 'ADMINISTRATIVE', 'Postępowania administracyjne, sądownictwo administracyjne'),
('Prawo Podatkowe', 'TAX', 'Doradztwo podatkowe, spory z organami podatkowymi'),
('Prawo Międzynarodowe', 'INTERNATIONAL', 'Prawo międzynarodowe prywatne i publiczne'),
('Prawo Własności Intelektualnej', 'IP', 'Patenty, znaki towarowe, prawa autorskie'),
('Prawo Bankowe', 'BANKING', 'Prawo bankowe i finansowe, kredyty, inwestycje'),
('Prawo Ubezpieczeniowe', 'INSURANCE', 'Sprawy ubezpieczeniowe, odszkodowania');

-- Create indexes for performance
CREATE INDEX idx_law_firms_city ON law_firms(city);
CREATE INDEX idx_law_firms_search_vector ON law_firms USING gin(search_vector);
CREATE INDEX idx_law_firms_active ON law_firms(is_active) WHERE is_active = true;
CREATE INDEX idx_lawyers_law_firm ON lawyers(law_firm_id);
CREATE INDEX idx_api_usage_created_at ON api_usage(created_at);
CREATE INDEX idx_api_usage_law_firm ON api_usage(law_firm_id);
CREATE INDEX idx_search_analytics_created_at ON search_analytics(created_at);

-- Create full-text search function
CREATE OR REPLACE FUNCTION update_law_firm_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := 
        setweight(to_tsvector('polish', COALESCE(NEW.name, '')), 'A') ||
        setweight(to_tsvector('polish', COALESCE(NEW.description, '')), 'B') ||
        setweight(to_tsvector('polish', COALESCE(NEW.city, '')), 'C');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for search vector updates
CREATE TRIGGER update_law_firm_search_vector_trigger
    BEFORE INSERT OR UPDATE ON law_firms
    FOR EACH ROW
    EXECUTE FUNCTION update_law_firm_search_vector();

-- Create function for advanced search
CREATE OR REPLACE FUNCTION search_law_firms(
    search_query TEXT DEFAULT NULL,
    search_city TEXT DEFAULT NULL,
    search_specializations TEXT[] DEFAULT NULL,
    limit_count INTEGER DEFAULT 20,
    offset_count INTEGER DEFAULT 0
)
RETURNS TABLE(
    id UUID,
    name TEXT,
    tax_number TEXT,
    krs_number TEXT,
    description TEXT,
    street TEXT,
    city TEXT,
    postal_code TEXT,
    country TEXT,
    phone TEXT,
    email TEXT,
    website TEXT,
    founded_date DATE,
    business_hours JSONB,
    is_active BOOLEAN,
    is_verified BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    specializations JSONB,
    lawyers JSONB,
    rank REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        lf.id,
        lf.name,
        lf.tax_number,
        lf.krs_number,
        lf.description,
        lf.street,
        lf.city,
        lf.postal_code,
        lf.country,
        lf.phone,
        lf.email,
        lf.website,
        lf.founded_date,
        lf.business_hours,
        lf.is_active,
        lf.is_verified,
        lf.created_at,
        lf.updated_at,
        COALESCE(
            (SELECT jsonb_agg(
                jsonb_build_object(
                    'id', s.id,
                    'name', s.name,
                    'code', s.code,
                    'description', s.description
                )
            )
            FROM specializations s
            JOIN law_firm_specializations lfs ON s.id = lfs.specialization_id
            WHERE lfs.law_firm_id = lf.id AND s.is_active = true),
            '[]'::jsonb
        ) as specializations,
        COALESCE(
            (SELECT jsonb_agg(
                jsonb_build_object(
                    'id', l.id,
                    'first_name', l.first_name,
                    'last_name', l.last_name,
                    'title', l.title,
                    'email', l.email,
                    'phone', l.phone,
                    'bar_number', l.bar_number
                )
            )
            FROM lawyers l
            WHERE l.law_firm_id = lf.id AND l.is_active = true),
            '[]'::jsonb
        ) as lawyers,
        CASE 
            WHEN search_query IS NOT NULL THEN ts_rank(lf.search_vector, plainto_tsquery('polish', search_query))
            ELSE 0
        END as rank
    FROM law_firms lf
    WHERE lf.is_active = true
        AND (search_query IS NULL OR lf.search_vector @@ plainto_tsquery('polish', search_query))
        AND (search_city IS NULL OR lf.city ILIKE '%' || search_city || '%')
        AND (
            search_specializations IS NULL 
            OR EXISTS (
                SELECT 1 FROM law_firm_specializations lfs
                JOIN specializations s ON lfs.specialization_id = s.id
                WHERE lfs.law_firm_id = lf.id 
                AND s.code = ANY(search_specializations)
            )
        )
    ORDER BY 
        CASE WHEN search_query IS NOT NULL THEN rank END DESC,
        lf.is_verified DESC,
        lf.name ASC
    LIMIT limit_count
    OFFSET offset_count;
END;
$$ LANGUAGE plpgsql;

-- Create function to create law firm with owner
CREATE OR REPLACE FUNCTION create_law_firm_with_owner(
    firm_data JSONB,
    owner_email TEXT
)
RETURNS UUID AS $$
DECLARE
    owner_user_id UUID;
    new_firm_id UUID;
BEGIN
    -- Get or create owner user
    SELECT id INTO owner_user_id FROM users WHERE email = owner_email;
    
    IF owner_user_id IS NULL THEN
        INSERT INTO users (id, email, role)
        VALUES (uuid_generate_v4(), owner_email, 'lawyer')
        RETURNING id INTO owner_user_id;
    END IF;
    
    -- Create law firm
    INSERT INTO law_firms (
        name, tax_number, krs_number, description,
        street, city, postal_code, country,
        phone, email, website, founded_date,
        business_hours, owner_id
    )
    VALUES (
        firm_data->>'name',
        firm_data->>'tax_number',
        firm_data->>'krs_number',
        firm_data->>'description',
        firm_data->'address'->>'street',
        firm_data->'address'->>'city',
        firm_data->'address'->>'postal_code',
        COALESCE(firm_data->'address'->>'country', 'PL'),
        firm_data->'contact'->>'phone',
        firm_data->'contact'->>'email',
        firm_data->'contact'->>'website',
        CASE WHEN firm_data->>'founded_date' IS NOT NULL 
             THEN (firm_data->>'founded_date')::DATE 
             ELSE NULL END,
        firm_data->'business_hours',
        owner_user_id
    )
    RETURNING id INTO new_firm_id;
    
    -- Create trial subscription
    INSERT INTO subscriptions (
        law_firm_id, plan_name, status,
        current_period_start, current_period_end,
        api_calls_limit
    )
    VALUES (
        new_firm_id, 'trial', 'trial',
        NOW(), NOW() + INTERVAL '30 days',
        1000
    );
    
    RETURN new_firm_id;
END;
$$ LANGUAGE plpgsql;

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE law_firms ENABLE ROW LEVEL SECURITY;
ALTER TABLE lawyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
    FOR SELECT USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Anyone can read active law firms (public directory)
CREATE POLICY "Anyone can read active law firms" ON law_firms
    FOR SELECT USING (is_active = true);

-- Law firm owners can update their firms
CREATE POLICY "Owners can update their law firms" ON law_firms
    FOR UPDATE USING (auth.uid() = owner_id);

-- Law firm owners can manage their lawyers
CREATE POLICY "Owners can manage lawyers" ON lawyers
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM law_firms 
            WHERE id = lawyers.law_firm_id 
            AND owner_id = auth.uid()
        )
    );

-- Admins can access everything
CREATE POLICY "Admins can access all data" ON users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    );

CREATE POLICY "Admins can access all law firms" ON law_firms
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_law_firms_updated_at BEFORE UPDATE ON law_firms
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lawyers_updated_at BEFORE UPDATE ON lawyers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_specializations_updated_at BEFORE UPDATE ON specializations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
