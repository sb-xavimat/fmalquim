# FMLAQUIM - V2
Segona versió, a partir de les instruccions d'Albert.

## BACKLOG
* Funció per extraure la info de la fórmula
    * que funcione per als peròxids amb parèntesis com Fe2(O2)3

* Convertir el array ELEMENTS en un objecte on les claus siguen els symbols dels elements.
* ELEMENTS: triar el nom preferit en els elements que tenen dos noms
    * Ex.: Zinc / Cinc, Plata / Argent...


## TODO


## DOING
* Sistema NOX
    * F>N:
        * 2. Hidrurs metàl·lics
        * 3. Hidràcids
        * 4. Òxids metàl·lics
        * 5. Òxids no-metàl·lics
        * 7. Altres covalents
        * 8. Sals binàries
        * ❌ 9. Peròxids
        * ❌ 10. Hidròxids


## DOCS
* Instruccions Albert
https://docs.google.com/document/d/1cOuLTbTQBWHfxo7O-okHPJ1xLedBDwHx5clAaAo3_EQ
* Elements (Albert)
https://docs.google.com/spreadsheets/d/1zX20gobs-MakQzVPR98ZC9iydOQ_5Nmo8bka7pETSoY/edit?gid=0#gid=0
* Totes substàncies:
https://docs.google.com/spreadsheets/d/1O8kvqDk8KlTeuc65Y55WfPjs5MaBuha43y3AOy8OsPA/edit?gid=0#gid=0
* Recurs
https://merlin.learning-bits.net/intranet/es/mylesson/index?code=l1h63ew_es&modo=3&Apag=l1h63ew_pg1
* Totes fitxes
* NOMENCLATURA NOVA (pàgines 6164 i no 6163)
    * Substàncies elementals
        * https://merlin.learning-bits.net/intranet/es/mylesson/index?code=l5e6164_es&modo=3&Apag=l5e6164_pg9
    * Hidrurs metàl·lics
        * https://merlin.learning-bits.net/intranet/es/mylesson/index?code=l5e6164_es&modo=3&Apag=l5e6164_pg14
    * Hidràcids (STOCK i TRADICIONAL)
        * https://merlin.learning-bits.net/intranet/es/mylesson/index?code=l5e6164_es&modo=3&Apag=l5e6164_pg15
    * Òxids metàl·lics
        * https://merlin.learning-bits.net/intranet/es/mylesson/index?code=l5e6164_es&modo=3&Apag=l5e6164_pg12
    * Òxids no metàl·lics
        * https://merlin.learning-bits.net/intranet/es/mylesson/index?code=l5e6164_es&modo=3&Apag=l5e6164_pg13
    * Compostos covalents no metàl·lics
        * https://merlin.learning-bits.net/intranet/es/mylesson/index?code=l5e6164_es&modo=3&Apag=l5e6164_pg11
    * Sals binàries
        * https://merlin.learning-bits.net/intranet/es/mylesson/index?code=l5e6164_es&modo=3&Apag=l5e6164_pg10
    * Hidròxids
        * https://merlin.learning-bits.net/intranet/es/mylesson/index?code=l5e6164_es&modo=3&Apag=l5e6164_pg16
    * FULL:
        * https://docs.google.com/spreadsheets/d/17Fq-XNF-SITZA2D9gfGM2ICwqePq1pA7K_-Zn_25I0s/edit?gid=0#gid=0



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

### 2025-02-28
* modificar `parseFmla`, perquè ara tenim tres elements (un grup peròxid OH, que pot tindre parèntesi)
* Sistema PRE. F>N:
    * (FET) Substàncies elementals
    * (FET) Hidrurs metàl·lics
    * (FET) Òxids metàl·lics
    * (FET) Òxids no-metàl·lics
    * (FET) Halogenurs d’oxigen
    * (FET) Altres covalents
    * (FET) Sals binàries
    * (FET) Peròxids
    * (FET) Hidròxids
