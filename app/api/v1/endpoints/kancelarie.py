from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from sqlalchemy.orm import Session
from app.api.v1.schemas.kancelaria import KancelariaCreate, KancelariaUpdate, KancelariaInDB
from app.db.database import get_db
from app.models.kancelaria import Kancelaria

router = APIRouter()

@router.post("/", response_model=KancelariaInDB, status_code=status.HTTP_201_CREATED)
async def create_kancelaria(kancelaria: KancelariaCreate, db: Session = Depends(get_db)):
    db_kancelaria = Kancelaria(**kancelaria.model_dump())
    db.add(db_kancelaria)
    db.commit()
    db.refresh(db_kancelaria)
    return db_kancelaria

@router.get("/", response_model=List[KancelariaInDB])
async def read_kancelarie(db: Session = Depends(get_db)):
    return db.query(Kancelaria).all()

@router.get("/{kancelaria_id}", response_model=KancelariaInDB)
async def read_kancelaria(kancelaria_id: int, db: Session = Depends(get_db)):
    kancelaria = db.query(Kancelaria).filter(Kancelaria.id == kancelaria_id).first()
    if kancelaria is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Kancelaria not found")
    return kancelaria

@router.put("/{kancelaria_id}", response_model=KancelariaInDB)
async def update_kancelaria(kancelaria_id: int, kancelaria_update: KancelariaUpdate, db: Session = Depends(get_db)):
    db_kancelaria = db.query(Kancelaria).filter(Kancelaria.id == kancelaria_id).first()
    if db_kancelaria is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Kancelaria not found")
    
    for key, value in kancelaria_update.model_dump(exclude_unset=True).items():
        setattr(db_kancelaria, key, value)
    
    db.commit()
    db.refresh(db_kancelaria)
    return db_kancelaria

@router.delete("/{kancelaria_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_kancelaria(kancelaria_id: int, db: Session = Depends(get_db)):
    db_kancelaria = db.query(Kancelaria).filter(Kancelaria.id == kancelaria_id).first()
    if db_kancelaria is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Kancelaria not found")
    
    db.delete(db_kancelaria)
    db.commit()
    return