# FMLAQUIM - V2
Segona versió, a partir de les instruccions d'Albert.
➡️ ✅ ❌ ❓

## BACKLOG #################################################<!-- MARK: BACKLOG >
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



## TODO #######################################################<!-- MARK: TODO >
* Per l'informe d'eusquera:
    * Cal explicar bé el fet que acceptem diversos noms. He trobat variants ací: https://www.alonsoformula.com/ezorganikoa/hidracidos.htm , per exemple: "Hidrogeno fluoruroa edo fluoranoa".
    * Comprovar arrels d'elements (verure `elements.js`)
    * Formació d'hidràcids (sistema PRE): me l'he inventada, perquè la fitxa que tenim no posa el prefix. He trobat alguns que posen sempre mono- quan és 1. https://www.euskadi.eus/contenidos/documentacion/inn_doc_otros_ambitos/es_def/adjuntos/euskal/estilo/951007e_Pub_EJ_zientzia_teknika.pdf

* Al final, pujar el codi de `/lib` a `Z:\produccion\rec\rec0\rec0000\pag\pgchem\progress\lib`.



## DOING #####################################################<!-- MARK: DOING >
* Fer versió Eusquera:
    * Fer document per als revisors de l'eusquera:
        * ➡️ `elements.js`: arrels.
        * ➡️ `help.js`: textos d'ajuda.
        * ➡️ `literals.js`: textos literals




## DOCS #######################################################<!-- MARK: DOCS >
* Instruccions Albert
https://docs.google.com/document/d/1cOuLTbTQBWHfxo7O-okHPJ1xLedBDwHx5clAaAo3_EQ
* Elements (Albert)
https://docs.google.com/spreadsheets/d/1zX20gobs-MakQzVPR98ZC9iydOQ_5Nmo8bka7pETSoY/edit?gid=0#gid=0
* Totes substàncies:
https://docs.google.com/spreadsheets/d/1O8kvqDk8KlTeuc65Y55WfPjs5MaBuha43y3AOy8OsPA/edit?gid=0#gid=0
* Recurs de preguntes:
https://merlin.learning-bits.net/intranet/es/mylesson/index?code=l1h63ew_es&modo=3&Apag=l1h63ew_ac2_ap1
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
* Fitxes anglés:
    * https://merlin.learning-bits.net/intranet/en/mylesson/index?code=l1h63eb_en&modo=3&Apag=l5e6163_pg9



## DONE #######################################################<!-- MARK: DONE >
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
* Posar una variable "debug" que mostre missatges en carddata.js

### 2025-04-11
* Fer la fitxa PRE d'hidràcids, formalment.

### 2025-04-30
* Substituir en MINUS SIGN amb EN DASH
* No exportar la funció `getName` a l'objecte global.
* Versió 1.1.1.
* Afegir tipus de font "Franklin Gothic Book" al CSS
    * No influïx en la llibreria, només en la web.

### 2025-05-07
* Fitxes d'ajuda: Posar titulet amb el tipus de substància.
* Versió 1.2.0, rebuild

### 2025-05-22
* `literals.js`, afegir anglés
* `elements.js`, afegir noms i arrels en anglés.
* Genitiu també en angles (simplement, un espai).
* Anglés: Quins tipus de substàncies es fan en cada namesys:
    * FORMULATION (EN)
        * (basicament, tot allò que té metalls, NOX)
    * 1.Substàncies pures - PRE
    * 2.Hidrurs metàl·lics - NOX
    * 3.Hidràcids - NOX
    * 4.Òxids metàl·lics - NOX
    * 5.Òxids no-metàl·lics - PRE
    * 6.Halogenurs d'oxigen - PRE
    * 7.Altres compostos covalents - PRE
    * 8.Sals binàries - NOX
    * 9.Peròxids - NOX
    * 10.Hidròxids - NOX
* Versió en anglès: fitxes explicatives.
    - Vore les fitxes en anglés: fer el sistema de fitxes en anglés
        - Copiar tots els textos.
    * trobaràs les fitxes aquí:
        * https://merlin.learning-bits.net/intranet/en/mylesson/index?code=l1h63eb_en&modo=3&Apag=l5e6163_pg9
* Versió en anglès: fitxes explicatives.
    * Vore les fitxes en anglés: fer el sistema de fitxes en anglés
    * Estudiar i trobar les diferències.
        - Pareix que canvia l'orde de F>N, però potser no de N>F.
    * 1.Substàncies pures - PRE.
        * Tot OK (FN i NF)
    * 2.Hidrurs metàl·lics - NOX
        * FN: canvia l'orde pas per pas, i del nom resultant
        * NF: canvia l'orde només del nom
    * 3.Hidràcids - NOX
        * FN: canvia l'orde pas per pas, i del nom resultant
        * NF: canvia l'orde només del nom
    * 4.Òxids metàl·lics - NOX
        * FN: canvia l'orde pas per pas, i del nom resultant
        * NF: canvia l'orde només del nom
    * 5.Òxids no-metàl·lics - PRE
        * FN: canvia l'orde pas per pas, i del nom resultant
        * NF: canvia l'orde només del nom
    * 6.Halogenurs d'oxigen - PRE
        * FN: canvia l'orde pas per pas, i del nom resultant
        * NF: canvia l'orde només del nom
    * 7.Altres compostos covalents - PRE
        * FN: canvia l'orde pas per pas, i del nom resultant
        * NF: canvia l'orde només del nom
    * 8.Sals binàries - NOX
        * FN: canvia l'orde pas per pas, i del nom resultant
        * NF: canvia l'orde només del nom
    * 9.Peròxids - NOX
        * FN: canvia l'orde pas per pas, i del nom resultant
        * NF: canvia l'orde només del nom
    * 10.Hidròxids - NOX
        * FN: canvia l'orde pas per pas, i del nom resultant
        * NF: canvia l'orde només del nom
* Versió 1.3.0, amb build

### 2025-06-05
* Fer un gsheet amb l'ajuda en castellà, català i anglès, per revisar l'anglés.
    * https://docs.google.com/spreadsheets/d/1R024Zg032Z7GZ5abqhc_hP4f2G5cVV5n_qOoAX_0FJQ/edit?gid=0#gid=0

### 2025-09-16
* Situació de l'anglés. Està tot fet.
* Començar a fer l'eusquera.

### 2025-09-17
* Simplificar gestió de colors. Usar només COLOR, i no COL_NAME (com el nom era el mateix, era redundant).
* Fer versió Eusquera:
    * (FET) Fitxers on cal afegir l'eusquera:
        * (FET) `constans.js` prefixes grecs que canvien en euskera
            * Creada (en `utils.js`) la funció `getPrefix(lang, sub)` per a obtindre el prefix segons la llengua.
        * (FET) `elements.js`: en cada element:
            * (FET) cal afegir el nom  `name_eu`
            * (FET-cal revisat) i l'arrel `stem_eu`
        * (FET) `help.js`: cal tota l'ajuda en euskera. ~~Faré una primera versió amb IA, seguint l'estructura de l'anglés.~~
            * (FET) Textos en eusquera, agafats de les fitxes existents, no amb IA.
        * (FET) `htmlcard.js`: caldrà saber si alguna terminació en eusquera s'ha de posar el color, com es fa amb `-uro, -ur, -ide`.
            * Per ara, en les instruccions, posa `-uro` (encara que en el nom de la substància posa `-uroa`).
        * (FET) `literals.js`:
            * (FET) Afegits els literals en eusquera
        * (FET) `utils.js`: revisar la funció `getGenitive` per a l'eusquera.
            * Posat un espai com l'anglés (perquè l'orde és com l'anglés).
        * `carddata.js`:
            * (FET) On es desdobla en anglés, posar també l'eusquera.
            * (FET) substàncies elementals: afegir la desinència amb -a al nom de l'element (amb les variants de Fluorra i Zilarra, que desdoblen la 'r').
            * (FET) Afegir el desdoblament en eusquera, amb l'orde invers, per als tipus+sistemes que no existiexen en anglés (agafar les idees de como ho he fet per l'anglés).
