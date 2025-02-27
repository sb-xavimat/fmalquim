# FMLAQUIM - V2
Segona versió, a partir de les instruccions d'Albert.

## BACKLOG
* Funció per extraure la info de la fórmula
    * TODO: que funcione per als peròxids
    * TODO: parèntesis
    * TODO: grups sense parèntesis "OH", ...
* Convertir el array ELEMENTS en un objecte on les claus siguen els symbols dels elements.

## TODO


## DOING
* Sistema PRE. F>N:
    * (FET) Substàncies elementals
    * (FET) Hidrurs metàl·lics
    * (CAL CREAR LA FITXA D'AJUDA) Hidràcids
    * Òxids metàl·lics
        * FENT: TODO: genenitiu català que depén de:
            * Si hi ha prefix: prefix apostrofable
            * Si no hi ha prefix: elem apostrofable
    * Òxids no-metàl·lics
    * Halogenurs d’oxigen
    * Altres covalents
    * Sals binàries
    * Peròxids
    * Hidròxids


## DOCS
* Instruccions Albert
https://docs.google.com/document/d/1cOuLTbTQBWHfxo7O-okHPJ1xLedBDwHx5clAaAo3_EQ
* Elements (Albert)
https://docs.google.com/spreadsheets/d/1zX20gobs-MakQzVPR98ZC9iydOQ_5Nmo8bka7pETSoY/edit?gid=0#gid=0
* Totes substàncies:
https://docs.google.com/spreadsheets/d/1O8kvqDk8KlTeuc65Y55WfPjs5MaBuha43y3AOy8OsPA/edit?gid=0#gid=0


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

### 2025-02-27
* Transfromar l'objecte d'ajuda per posar ids i keys més entenedores
    * Usar el `namesys` i  la `id` amb text en compte de numèriques.
* Construir usant les instruccions d'Albert i el codi ja fet de v1.

