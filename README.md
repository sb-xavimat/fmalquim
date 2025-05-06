# FMLAQUIM - V2
Segona versió, a partir de les instruccions d'Albert.

## BACKLOG #####################################################################
* Convertir el array ELEMENTS en un objecte on les claus siguen els symbols dels elements.
* ELEMENTS: triar el nom preferit en els elements que tenen dos noms
    * Ex.: Zinc / Cinc, Plata / Argent, Wolframi / Tungstè

* On escriure la info: "abans del paréntesis no hi ha cap espai".

* En chemhelp, revisar si cal contraure pentaòxid a pentòxid en ES i CA.
    * Pareix que no (segons un informe de la real societat española de química)
    * https://fisquiweb.es/Formulacion/RSEQ/4-Errores.pdf

* Memoizatzió de getHelpCard
* Es podrien fer funcions específiques que només obtenen les fórmules i els noms complets.
    * I altres funcions per als passos intermedis, que aprofiten les primeres.

* Generar totes les variants dels noms:
    * Amb diversos noms dels elements (Zinc/Cinc, Plata/Argent, etc.)
    * Amb variants de contraccions (pentaòxid/pentòxid, etc.)
    * Amb variants d'opcionalitat (alguns "mono-", etc.)

* Amb les funcions que generen totes les variants, es pot generar el full de substàncies/preguntes automàticament amb mínimes infos:
    * Mínimes infos:
        * `fmla` Fórmula
        * `kind_id` Tipus de substància
        * `years`Curs (3/4/3+4)
    * Les infos que no cal donar:
        * `id` (autogenerada per posició)
        * `idstr` (autogenerada per id+sistema)
        * `namesys` i `namesys_id`: ja sabem tots els sistemes vàlids segons el `kinds_id` (Tipus de substancia)
        * `names_es`, `names_ca` Generat, si fem una funció que genere totes les variants. Ara mateix ja generem la versió preferida del nom
        * `names_eu` Per estudiar
        * `kind`: derivada del `kind_id`
        * `pags`: queda com info no rellevant

* Posar una variable "debug" que mostre retorne missatges en caddata.js


## TODO ########################################################################



## DOING #######################################################################
* Fitxes d'ajuda: Posar titulet amb el tipus de substància.



## DOCS ########################################################################
* Instruccions Albert
https://docs.google.com/document/d/1cOuLTbTQBWHfxo7O-okHPJ1xLedBDwHx5clAaAo3_EQ
* Elements (Albert)
https://docs.google.com/spreadsheets/d/1zX20gobs-MakQzVPR98ZC9iydOQ_5Nmo8bka7pETSoY/edit?gid=0#gid=0
* Totes substàncies:
https://docs.google.com/spreadsheets/d/1O8kvqDk8KlTeuc65Y55WfPjs5MaBuha43y3AOy8OsPA/edit?gid=0#gid=0
* Recurs de preguntes:
https://merlin.learning-bits.net/intranet/es/mylesson/index?code=l1h63ew_es&modo=3&Apag=l1h63ew_pg1
* La nostra taula periòdica
https://merlin.learning-bits.net/intranet/es/mylesson/index?code=l5e6164_es&modo=3&Apag=l5e6164_pg19
* Totes fitxes
* NOMENCLATURA NOVA (pàgines 6164 i no 6163)
    * 1.Substàncies elementals
        * https://merlin.learning-bits.net/intranet/es/mylesson/index?code=l5e6164_es&modo=3&Apag=l5e6164_pg9
    * 2.Hidrurs metàl·lics
        * https://merlin.learning-bits.net/intranet/es/mylesson/index?code=l5e6164_es&modo=3&Apag=l5e6164_pg14
    * 3.Hidràcids (STOCK i TRADICIONAL)
        * https://merlin.learning-bits.net/intranet/es/mylesson/index?code=l5e6164_es&modo=3&Apag=l5e6164_pg15
    * 4.Òxids metàl·lics
        * https://merlin.learning-bits.net/intranet/es/mylesson/index?code=l5e6164_es&modo=3&Apag=l5e6164_pg12
    * 5.Òxids no metàl·lics
        * https://merlin.learning-bits.net/intranet/es/mylesson/index?code=l5e6164_es&modo=3&Apag=l5e6164_pg13
    * 6-Halogenurs d'oxigen
        *
    * 7.Compostos covalents no metàl·lics
        * https://merlin.learning-bits.net/intranet/es/mylesson/index?code=l5e6164_es&modo=3&Apag=l5e6164_pg11
    * 8.Sals binàries
        * https://merlin.learning-bits.net/intranet/es/mylesson/index?code=l5e6164_es&modo=3&Apag=l5e6164_pg10
    * 9.Peròxids
        * https://merlin.learning-bits.net/intranet/es/mylesson/index?code=l5e6164_es&modo=3&Apag=l5e6164_pg31
    * 10.Hidròxids
        * https://merlin.learning-bits.net/intranet/es/mylesson/index?code=l5e6164_es&modo=3&Apag=l5e6164_pg16
    * FULL:
        * https://docs.google.com/spreadsheets/d/17Fq-XNF-SITZA2D9gfGM2ICwqePq1pA7K_-Zn_25I0s/edit?gid=0#gid=0



## DONE ########################################################################
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
* Comprovar quants elements tenen només una valència positiva i una negativa.
    * hidrogen, silici i àstat
* Sistema NOX
    * F>N:
        * 2. Hidrurs metàl·lics
        * 3. Hidràcids
        * 4. Òxids metàl·lics
        * 5. Òxids no-metàl·lics
        * 7. Altres covalents
        * 8. Sals binàries

### 2025-03-03
* Funció per extraure la info de la fórmula
    * que funcione per als peròxids amb parèntesis com Fe2(O2)3
* 9.Peròxids
    * Cal una informació extra: si porta parèntesis o no.
        * Per poder distingir fórmules com Au2(O2)3
* `getNox`:
    * Pareix que quan es diu "si té més d'un nox", en realitat vol dir "si té més d'un nox positiu".
    * Si este és el cas, aleshores la funció getNox ha de tornar "" per a l'hidrogen, el silici i l'àstat, encara que tinguen una "/" en el nox.
* `getPeroxidesNOX_FN`:
    * S'ha intentat revertir l'eventual simplificació.
* Sistema NOX
    * F>N:
        * 9. Peròxids
        * 10. Hidròxids
* Sistema PRE.
    * N>F:
        * 1. Substàncies elementals
        * 2. Hidrurs metàl·lics
        * 4. Òxids metàl·lics
* Sistema NOX
    * N>F:
        * 2. Hidrurs metàl·lics
        * 3. Hidràcids

### 2025-02-04
* Sistema PRE.
    * N>F:
        * 5. Òxids no-metàl·lics
        * 6. Halogenurs d’oxigen
        * 7. Altres covalents
        * 8. Sals binàries
        * 9. Peròxids (sense paréntesis)
        * 10. Hidròxids
* Sistema NOX
    * N>F:
        * 4. Òxids metàl·lics
        * 5. Òxids no-metàl·lics
        * 7. Altres covalents
        * 8. Sals binàries
        * 9. Peròxids
        * 10. Hidròxids
* Usar `esbuildjs` per a fer el build del projecte.
    * Usar iiefe i global-name per crear un objecte que pot posar-se en una llibreria carregada pel fla, o dins del mateix fla (i així no contamina l'espai global).
* Posar exemples cada vegada que se seleccione un tipus de substància
    * Afagar-los del full de substàncies

### 2025-02-06
* Corregir el guionet suau de -uro/-ur a guionet de no separació.
* Ampliar la llibreria per generar les fitxes d'info, en compte de generar-les en app.js

### 2025-02-07
* Typo in help-es
* Llevar el border-radius en el contenidor principal de la targeta
* Restucturar els arxius de la llibreria
    * L'arxiu principal és massa gran
    * crear un `index.js` que siga el punt d'entrada de la llibreria

### 2025-03-13
* Fer un nou mètode en la llibreria: getName.

### 2025-03-17
* Esborrar de 'help' tots els camps que no s'usen (només s'usa `steps`)
* Millorar els exemples amb `<sub>`

### 2025-04-09
* Millora d'ajuda;
    * -6-PRE-FN: pas 1:
        * "Prefijo griego correspondiente al subíndice del halógeno (si hay subíndice)",
        * Sempre serà 2
        * POSAT com a comentari en help.js
* Producció:
    * Evitar que 'cardata.js' retorne missatges de debug
    * Pot posar-los en 'title', perquè no s'usa al generar la targeta HTML.
* Fer versió de producció:
    * Distingir les fitxes usables de les no usables (perquè no clares)
    * Moure els comentaris meus a una propietat diferent.
        * Millor: posats com a comentaris
    * El camp "right" de la primera línia no s'utilitza
        * (el camp "left" es convertix en la capçalera de la fitxa.)

### 2025-04-11
* Fer la fitxa PRE d'hidràcids, formalment.

### 2025-04-30
* Substituir en MINUS SIGN amb EN DASH
* No exportar la funció `getName` a l'objecte global.
* Versió 1.1.1.
* Afegir tipus de font "Franklin Gothic Book" al CSS
    * No influïx en la llibreria, només en la web.
