# FMLAQUIM - V2
Segona versió, a partir de les instruccions d'Albert.

## BACKLOG

## TODO
* Funció per extraure la info de la fórmula
    * TODO: que funcione per als peròxids
    * TODO: parèntesis
    * TODO: grups sense parèntesis "OH", ...

## DOING

## DOCS
* Instruccions Albert
https://docs.google.com/document/d/1cOuLTbTQBWHfxo7O-okHPJ1xLedBDwHx5clAaAo3_EQ/edit?tab=t.0#heading=h.3z5xqoph7zde
* Elements (Albert)
https://docs.google.com/spreadsheets/d/1zX20gobs-MakQzVPR98ZC9iydOQ_5Nmo8bka7pETSoY/edit?gid=0#gid=0

## DONE
### 2025-02-26
* Funció per extraure la info de la fórmula
    * Se suposa una fórmula ben feta (no es comprova)
    * Itera cada caràcter:
        * Si troba una majúscula, comença un element
        * Si troba un número (i no estava parsejant números), comença un subíndex
        * En qualsevol altre cas: continua amb el que estava parsejant
        * Inicialment, parseja un element
* Preparar versió 2
