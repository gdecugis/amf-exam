var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// api/db.js
async function onRequestGet() {
  const questions = [
    {
      "type": "A",
      "question": "Quelle est la sanction maximale que peut prononcer la commission des sanctions de l'AMF \xE0 l'encontre d'une personne morale ?",
      "choices": [
        "10 millions d'euros",
        "100 millions d'euros",
        "1 milliard d'euros"
      ],
      "correctIndex": 1,
      "explanation": "La commission des sanctions peut infliger une amende maximale de 100 millions d'euros aux personnes morales.",
      "themeId": 1,
      "theme": "Cadre institutionnel et r\xE9glementaire"
    },
    {
      "type": "A",
      "question": "Quel est le d\xE9lai de transmission \xE0 l'AMF du rapport annuel d'une soci\xE9t\xE9 de gestion de portefeuille ?",
      "choices": [
        "4 mois",
        "8 mois",
        "6 mois"
      ],
      "correctIndex": 2,
      "explanation": "Les soci\xE9t\xE9s de gestion doivent transmettre leur rapport annuel \xE0 l'AMF dans les six mois suivant la cl\xF4ture de l'exercice.",
      "themeId": 1,
      "theme": "Cadre institutionnel et r\xE9glementaire"
    },
    {
      "type": "A",
      "question": "Quel est l'effet d'une hausse des taux d'int\xE9r\xEAt sur le prix des obligations \xE0 taux fixe ?",
      "choices": [
        "Diminution",
        "Augmentation",
        "Aucun effet"
      ],
      "correctIndex": 0,
      "explanation": "Une hausse des taux rend les obligations existantes moins attractives, entra\xEEnant une baisse de leur prix.",
      "themeId": 1,
      "theme": "Cadre institutionnel et r\xE9glementaire"
    },
    {
      "type": "A",
      "question": "Que se passe-t-il si le cours d'un titre d\xE9passe le prix limite d'un ordre d'achat \xE0 cours limit\xE9 ?",
      "choices": [
        "L'ordre est ex\xE9cut\xE9",
        "L'ordre reste en attente",
        "L'ordre est rejet\xE9"
      ],
      "correctIndex": 1,
      "explanation": "Un ordre \xE0 cours limit\xE9 d'achat n'est ex\xE9cut\xE9 que si le cours est inf\xE9rieur ou \xE9gal au prix limite ; sinon il reste en attente.",
      "themeId": 1,
      "theme": "Cadre institutionnel et r\xE9glementaire"
    },
    {
      "type": "A",
      "question": "Quelle autorit\xE9 est comp\xE9tente pour agr\xE9er les soci\xE9t\xE9s de gestion de portefeuille en France ?",
      "choices": [
        "AMF",
        "ACPR",
        "ESMA"
      ],
      "correctIndex": 0,
      "explanation": "L'AMF est l'autorit\xE9 charg\xE9e de d\xE9livrer les agr\xE9ments aux soci\xE9t\xE9s de gestion de portefeuille.",
      "themeId": 1,
      "theme": "Cadre institutionnel et r\xE9glementaire"
    },
    {
      "type": "A",
      "question": "Selon la directive MiFID, quelle est la dur\xE9e minimale de conservation des enregistrements des ordres par les prestataires de services d'investissement ?",
      "choices": [
        "3 ans",
        "5 ans",
        "10 ans"
      ],
      "correctIndex": 1,
      "explanation": "La directive MiFID impose une conservation minimale de 5 ans pour les enregistrements des ordres.",
      "themeId": 1,
      "theme": "Cadre institutionnel et r\xE9glementaire"
    },
    {
      "type": "C",
      "question": "Un investisseur souhaite acheter 100 actions \xE0 un cours maximum de 50 euros. Quel type d'ordre doit-il passer pour garantir ce prix maximal ?",
      "choices": [
        "Ordre au march\xE9",
        "Ordre \xE0 seuil de d\xE9clenchement",
        "Ordre \xE0 cours limit\xE9"
      ],
      "correctIndex": 2,
      "explanation": "L'ordre \xE0 cours limit\xE9 garantit un prix maximal, contrairement aux autres types d'ordres.",
      "themeId": 1,
      "theme": "Cadre institutionnel et r\xE9glementaire"
    },
    {
      "type": "C",
      "question": "Quelle autorit\xE9 est responsable de l'agr\xE9ment et de la surveillance des soci\xE9t\xE9s de gestion de portefeuille en France ?",
      "choices": [
        "L'ACPR",
        "L'AMF",
        "L'ESMA"
      ],
      "correctIndex": 1,
      "explanation": "L'AMF est l'autorit\xE9 comp\xE9tente pour agr\xE9er et surveiller les soci\xE9t\xE9s de gestion en France.",
      "themeId": 1,
      "theme": "Cadre institutionnel et r\xE9glementaire"
    },
    {
      "type": "C",
      "question": "Quelle autorit\xE9 europ\xE9enne est charg\xE9e de la surveillance directe des agences de notation de cr\xE9dit ?",
      "choices": [
        "ESMA",
        "EBA",
        "EIOPA"
      ],
      "correctIndex": 0,
      "explanation": "L'ESMA a la comp\xE9tence exclusive de surveillance des agences de notation dans l'UE.",
      "themeId": 1,
      "theme": "Cadre institutionnel et r\xE9glementaire"
    },
    {
      "type": "C",
      "question": "Quel type d'ordre est ex\xE9cut\xE9 imm\xE9diatement au meilleur prix disponible sur le march\xE9 ?",
      "choices": [
        "Ordre \xE0 cours limit\xE9",
        "Ordre \xE0 seuil de d\xE9clenchement",
        "Ordre au march\xE9"
      ],
      "correctIndex": 2,
      "explanation": "Un ordre au march\xE9 est ex\xE9cut\xE9 imm\xE9diatement au meilleur prix disponible.",
      "themeId": 1,
      "theme": "Cadre institutionnel et r\xE9glementaire"
    },
    {
      "type": "A",
      "question": "Quelle est l'obligation d'un conseiller en investissements financiers (CIF) concernant son enregistrement ?",
      "choices": [
        "Il doit \xEAtre enregistr\xE9 aupr\xE8s de l'ORIAS",
        "Il doit \xEAtre agr\xE9\xE9 par l'AMF",
        "Il doit \xEAtre immatricul\xE9 au registre du commerce"
      ],
      "correctIndex": 0,
      "explanation": "Les CIF sont tenus de s'enregistrer aupr\xE8s de l'ORIAS, pas d'obtenir un agr\xE9ment AMF.",
      "themeId": 2,
      "theme": "D\xE9ontologie et conformit\xE9"
    },
    {
      "type": "A",
      "question": "Quelle est la dur\xE9e minimale de conservation des enregistrements t\xE9l\xE9phoniques et communications \xE9lectroniques par les entreprises d'investissement selon MIFID II ?",
      "choices": [
        "3 ans",
        "5 ans",
        "10 ans"
      ],
      "correctIndex": 1,
      "explanation": "MIFID II impose une conservation d'au moins 5 ans pour ces enregistrements.",
      "themeId": 2,
      "theme": "D\xE9ontologie et conformit\xE9"
    },
    {
      "type": "A",
      "question": "Quelle est la diff\xE9rence entre un manquement d'initi\xE9 et un d\xE9lit d'initi\xE9 ?",
      "choices": [
        "Le manquement est une violation administrative, le d\xE9lit une infraction p\xE9nale",
        "Le manquement concerne les personnes physiques, le d\xE9lit les personnes morales",
        "Le manquement est puni d'une amende, le d\xE9lit d'une peine de prison uniquement"
      ],
      "correctIndex": 0,
      "explanation": "Le manquement d'initi\xE9 rel\xE8ve de la sanction administrative de l'AMF, le d\xE9lit d'initi\xE9 de la sanction p\xE9nale.",
      "themeId": 2,
      "theme": "D\xE9ontologie et conformit\xE9"
    },
    {
      "type": "A",
      "question": "En mati\xE8re de conformit\xE9, que signifie le principe de proportionnalit\xE9 dans la mise en \u0153uvre des obligations r\xE9glementaires ?",
      "choices": [
        "Les obligations s'appliquent de mani\xE8re identique \xE0 tous les acteurs",
        "Les obligations sont adapt\xE9es \xE0 la taille, \xE0 la nature et \xE0 la complexit\xE9 de l'activit\xE9",
        "Les obligations sont r\xE9duites pour les acteurs les plus rentables"
      ],
      "correctIndex": 1,
      "explanation": "Le principe de proportionnalit\xE9 permet d'ajuster les exigences selon les caract\xE9ristiques de l'entit\xE9.",
      "themeId": 2,
      "theme": "D\xE9ontologie et conformit\xE9"
    },
    {
      "type": "A",
      "question": "En mati\xE8re de pr\xE9vention des conflits d'int\xE9r\xEAts, quelle est l'obligation d'une soci\xE9t\xE9 de gestion ?",
      "choices": [
        "Refuser toute op\xE9ration susceptible de cr\xE9er un conflit d'int\xE9r\xEAts.",
        "Mettre en place une politique de pr\xE9vention et, si elle ne suffit pas, informer le client avant de traiter.",
        "D\xE9clarer \xE0 l'AMF chaque conflit d'int\xE9r\xEAts rencontr\xE9."
      ],
      "correctIndex": 1,
      "explanation": "La r\xE9glementation impose de pr\xE9venir les conflits, et \xE0 d\xE9faut, d'informer le client avant toute transaction.",
      "themeId": 2,
      "theme": "D\xE9ontologie et conformit\xE9"
    },
    {
      "type": "A",
      "question": "Quelle est la r\xE8gle concernant les op\xE9rations personnelles des collaborateurs d'une soci\xE9t\xE9 de gestion ?",
      "choices": [
        "Les collaborateurs ayant acc\xE8s \xE0 des informations privil\xE9gi\xE9es doivent obtenir une autorisation pr\xE9alable.",
        "Tous les collaborateurs doivent d\xE9clarer leurs op\xE9rations \xE0 l'AMF.",
        "Les op\xE9rations personnelles sont interdites pour tous les collaborateurs."
      ],
      "correctIndex": 0,
      "explanation": "Seuls les collaborateurs ayant acc\xE8s \xE0 des informations privil\xE9gi\xE9es sont soumis \xE0 une autorisation pr\xE9alable.",
      "themeId": 2,
      "theme": "D\xE9ontologie et conformit\xE9"
    },
    {
      "type": "C",
      "question": "En mati\xE8re de conformit\xE9, que signifie le principe de proportionnalit\xE9 ?",
      "choices": [
        "Les obligations sont identiques pour tous les acteurs.",
        "Les petites structures sont exon\xE9r\xE9es de toute obligation de conformit\xE9.",
        "Les obligations sont adapt\xE9es \xE0 la nature, \xE0 la taille et \xE0 la complexit\xE9 de l'activit\xE9."
      ],
      "correctIndex": 2,
      "explanation": "Le principe de proportionnalit\xE9 permet d'adapter les exigences r\xE9glementaires aux caract\xE9ristiques de l'acteur.",
      "themeId": 2,
      "theme": "D\xE9ontologie et conformit\xE9"
    },
    {
      "type": "C",
      "question": "Quelle obligation incombe \xE0 une soci\xE9t\xE9 de gestion en mati\xE8re de conformit\xE9 ?",
      "choices": [
        "Mettre en place une fonction de conformit\xE9 permanente, efficace et ind\xE9pendante.",
        "D\xE9signer un responsable de la conformit\xE9 qui doit \xEAtre membre du directoire.",
        "Externaliser obligatoirement la fonction de conformit\xE9 \xE0 un prestataire agr\xE9\xE9."
      ],
      "correctIndex": 0,
      "explanation": "La r\xE9glementation impose une fonction de conformit\xE9 permanente, efficace et ind\xE9pendante au sein de la soci\xE9t\xE9 de gestion.",
      "themeId": 2,
      "theme": "D\xE9ontologie et conformit\xE9"
    },
    {
      "type": "C",
      "question": "Quel est le r\xF4le de l'AMF en mati\xE8re de d\xE9ontologie et de conformit\xE9 ?",
      "choices": [
        "\xC9dicter les r\xE8gles de d\xE9ontologie pour les entreprises cot\xE9es.",
        "Contr\xF4ler le respect des obligations professionnelles des acteurs de march\xE9.",
        "Sanctionner les manquements \xE0 la d\xE9ontologie des journalistes financiers."
      ],
      "correctIndex": 1,
      "explanation": "L'AMF contr\xF4le le respect des obligations professionnelles des acteurs de march\xE9 et peut sanctionner les manquements.",
      "themeId": 2,
      "theme": "D\xE9ontologie et conformit\xE9"
    },
    {
      "type": "C",
      "question": "Dans le cadre de la lutte contre le blanchiment, que signifie l'approche par les risques ?",
      "choices": [
        "Appliquer les m\xEAmes mesures de vigilance \xE0 tous les clients sans distinction.",
        "Se concentrer uniquement sur les transactions sup\xE9rieures \xE0 un seuil fix\xE9.",
        "Adapter les mesures de vigilance en fonction du niveau de risque pr\xE9sent\xE9 par le client."
      ],
      "correctIndex": 2,
      "explanation": "L'approche par les risques consiste \xE0 moduler les mesures de vigilance selon le niveau de risque du client.",
      "themeId": 2,
      "theme": "D\xE9ontologie et conformit\xE9"
    },
    {
      "type": "A",
      "question": "En mati\xE8re de lutte contre le blanchiment, \xE0 quelle autorit\xE9 une soci\xE9t\xE9 de gestion doit-elle d\xE9clarer les op\xE9rations suspectes ?",
      "choices": [
        "\xC0 l'AMF",
        "\xC0 Tracfin",
        "\xC0 l'ACPR"
      ],
      "correctIndex": 1,
      "explanation": "Les soci\xE9t\xE9s de gestion d\xE9clarent les op\xE9rations suspectes \xE0 Tracfin, cellule de renseignement financier.",
      "themeId": 3,
      "theme": "S\xE9curit\xE9 financi\xE8re (LCB-FT, embargos)"
    },
    {
      "type": "A",
      "question": "Quelle est la dur\xE9e l\xE9gale de conservation des documents relatifs \xE0 la LCB-FT pour les professionnels assujettis ?",
      "choices": [
        "5 ans",
        "10 ans",
        "3 ans"
      ],
      "correctIndex": 0,
      "explanation": "Les documents doivent \xEAtre conserv\xE9s 5 ans apr\xE8s la fin de la relation d'affaires ou l'op\xE9ration.",
      "themeId": 3,
      "theme": "S\xE9curit\xE9 financi\xE8re (LCB-FT, embargos)"
    },
    {
      "type": "A",
      "question": "Dans le cadre d'un embargo, que signifie le gel des avoirs ?",
      "choices": [
        "Interdiction de tout \xE9change commercial avec le pays vis\xE9",
        "Saisie d\xE9finitive des biens des personnes d\xE9sign\xE9es",
        "Blocage des fonds et ressources \xE9conomiques des personnes d\xE9sign\xE9es"
      ],
      "correctIndex": 2,
      "explanation": "Le gel des avoirs bloque les fonds sans transfert de propri\xE9t\xE9, contrairement \xE0 une saisie.",
      "themeId": 3,
      "theme": "S\xE9curit\xE9 financi\xE8re (LCB-FT, embargos)"
    },
    {
      "type": "A",
      "question": "Quelle est la conduite \xE0 tenir pour un virement vers un pays soumis \xE0 un embargo ?",
      "choices": [
        "Ex\xE9cuter si le montant est inf\xE9rieur \xE0 10 000 euros",
        "Refuser et signaler l'op\xE9ration",
        "Ex\xE9cuter apr\xE8s v\xE9rification de l'identit\xE9 du b\xE9n\xE9ficiaire"
      ],
      "correctIndex": 1,
      "explanation": "Toute op\xE9ration vers un pays sous embargo doit \xEAtre refus\xE9e et signal\xE9e aux autorit\xE9s comp\xE9tentes.",
      "themeId": 3,
      "theme": "S\xE9curit\xE9 financi\xE8re (LCB-FT, embargos)"
    },
    {
      "type": "A",
      "question": "Selon la r\xE9glementation LCB-FT, quelle est l'obligation d'une entreprise d'assurance pour une op\xE9ration occasionnelle ?",
      "choices": [
        "D\xE9clarer syst\xE9matiquement toute op\xE9ration \xE0 Tracfin",
        "Identifier le client et le b\xE9n\xE9ficiaire effectif au-del\xE0 d'un seuil de 1 000 \u20AC",
        "Conserver les documents pendant 5 ans"
      ],
      "correctIndex": 1,
      "explanation": "L'identification est obligatoire pour les op\xE9rations occasionnelles \xE0 partir de 1 000 \u20AC.",
      "themeId": 3,
      "theme": "S\xE9curit\xE9 financi\xE8re (LCB-FT, embargos)"
    },
    {
      "type": "C",
      "question": "Quelle autorit\xE9 est charg\xE9e de la mise en \u0153uvre des sanctions financi\xE8res internationales (embargos) en France ?",
      "choices": [
        "La Direction g\xE9n\xE9rale du Tr\xE9sor (DG Tr\xE9sor)",
        "L'Autorit\xE9 de contr\xF4le prudentiel et de r\xE9solution (ACPR)",
        "La cellule de renseignement financier Tracfin"
      ],
      "correctIndex": 0,
      "explanation": "La DG Tr\xE9sor est l'autorit\xE9 comp\xE9tente pour appliquer les sanctions financi\xE8res.",
      "themeId": 3,
      "theme": "S\xE9curit\xE9 financi\xE8re (LCB-FT, embargos)"
    },
    {
      "type": "C",
      "question": "Quelle est la principale diff\xE9rence entre un embargo et une mesure de gel des avoirs ?",
      "choices": [
        "L'embargo est d\xE9cid\xE9 par l'UE, le gel des avoirs par la France",
        "Le gel des avoirs est une mesure pr\xE9ventive, l'embargo une mesure r\xE9pressive",
        "L'embargo concerne des biens ou secteurs, le gel des avoirs vise des personnes ou entit\xE9s"
      ],
      "correctIndex": 2,
      "explanation": "L'embargo cible des biens ou secteurs, le gel des avoirs cible des personnes ou entit\xE9s.",
      "themeId": 3,
      "theme": "S\xE9curit\xE9 financi\xE8re (LCB-FT, embargos)"
    },
    {
      "type": "C",
      "question": "\xC0 quelle autorit\xE9 une soci\xE9t\xE9 de gestion doit-elle d\xE9clarer une op\xE9ration suspecte dans le cadre de la LCB-FT ?",
      "choices": [
        "Le procureur de la R\xE9publique",
        "Tracfin",
        "L'AMF"
      ],
      "correctIndex": 1,
      "explanation": "Les professionnels assujettis doivent d\xE9clarer toute op\xE9ration suspecte \xE0 Tracfin, la cellule de renseignement financier.",
      "themeId": 3,
      "theme": "S\xE9curit\xE9 financi\xE8re (LCB-FT, embargos)"
    },
    {
      "type": "C",
      "question": "Quel seuil de d\xE9tention du capital ou des droits de vote caract\xE9rise un b\xE9n\xE9ficiaire effectif au sens de la LCB-FT ?",
      "choices": [
        "10 %",
        "25 %",
        "50 %"
      ],
      "correctIndex": 1,
      "explanation": "Le b\xE9n\xE9ficiaire effectif est toute personne d\xE9tenant plus de 25 % du capital ou des droits de vote.",
      "themeId": 3,
      "theme": "S\xE9curit\xE9 financi\xE8re (LCB-FT, embargos)"
    },
    {
      "type": "C",
      "question": "Quel est l'effet d'une mesure de gel des avoirs \xE9dict\xE9e dans le cadre d'un embargo sur les fonds d'une personne d\xE9sign\xE9e ?",
      "choices": [
        "Ils sont transf\xE9r\xE9s sous s\xE9questre judiciaire",
        "Ils sont confisqu\xE9s au profit de l'\xC9tat",
        "Ils sont bloqu\xE9s et ne peuvent faire l'objet d'aucune transaction"
      ],
      "correctIndex": 2,
      "explanation": "Le gel des avoirs interdit tout mouvement de fonds sans transfert de propri\xE9t\xE9.",
      "themeId": 3,
      "theme": "S\xE9curit\xE9 financi\xE8re (LCB-FT, embargos)"
    },
    {
      "type": "A",
      "question": "Selon le r\xE8glement MAR, quelle est la dur\xE9e maximale de report de la publication d'une information privil\xE9gi\xE9e par un \xE9metteur ?",
      "choices": [
        "Aucune dur\xE9e maximale, mais l'\xE9metteur doit en informer l'autorit\xE9 comp\xE9tente",
        "2 jours ouvr\xE9s maximum, sans condition",
        "10 jours de bourse maximum, sous r\xE9serve de l'accord de l'AMF"
      ],
      "correctIndex": 0,
      "explanation": "Le report est possible sans dur\xE9e fixe si les conditions de confidentialit\xE9 sont remplies et l'autorit\xE9 inform\xE9e.",
      "themeId": 4,
      "theme": "R\xE9glementation abus de march\xE9"
    },
    {
      "type": "A",
      "question": "Quelle est la proc\xE9dure de d\xE9claration des transactions des dirigeants (PDMR) selon MAR ?",
      "choices": [
        "Ils doivent d\xE9clarer \xE0 l'\xE9metteur uniquement dans les 10 jours ouvr\xE9s",
        "Ils doivent d\xE9clarer \xE0 l'\xE9metteur et \xE0 l'AMF dans les 3 jours ouvr\xE9s",
        "Ils doivent d\xE9clarer \xE0 l'AMF dans les 5 jours ouvr\xE9s, sans informer l'\xE9metteur"
      ],
      "correctIndex": 1,
      "explanation": "Le PDMR notifie \xE0 l'\xE9metteur et \xE0 l'autorit\xE9 comp\xE9tente dans un d\xE9lai de 3 jours ouvr\xE9s apr\xE8s la transaction.",
      "themeId": 4,
      "theme": "R\xE9glementation abus de march\xE9"
    },
    {
      "type": "A",
      "question": "Quelle pratique constitue une manipulation de march\xE9 par 'spoofing' ?",
      "choices": [
        "Ex\xE9cuter des ordres pour le compte de clients en respectant les r\xE8gles",
        "Publier des recherches sur une soci\xE9t\xE9 sans conflit d'int\xE9r\xEAts",
        "Passer des ordres sans intention de les ex\xE9cuter pour donner une fausse indication de la demande"
      ],
      "correctIndex": 2,
      "explanation": "Le spoofing consiste \xE0 afficher des ordres non sinc\xE8res pour tromper les autres participants sur le carnet d'ordres.",
      "themeId": 4,
      "theme": "R\xE9glementation abus de march\xE9"
    },
    {
      "type": "A",
      "question": "Qu'est-ce qu'une manipulation de march\xE9 par diffusion d'informations fausses ou trompeuses ?",
      "choices": [
        "Donner des informations exactes mais tardives",
        "Diffuser des informations inexactes pour influencer le cours d'un instrument financier",
        "Publier des informations r\xE9glement\xE9es conform\xE9ment \xE0 la r\xE9glementation"
      ],
      "correctIndex": 1,
      "explanation": "La diffusion d'informations inexactes ou trompeuses qui induit le march\xE9 en erreur constitue une manipulation de march\xE9.",
      "themeId": 4,
      "theme": "R\xE9glementation abus de march\xE9"
    },
    {
      "type": "A",
      "question": "Selon le r\xE8glement MAR, un \xE9metteur doit diffuser une information privil\xE9gi\xE9e au public :",
      "choices": [
        "d\xE8s que possible",
        "apr\xE8s validation par l'AMF",
        "dans un d\xE9lai de 24 heures"
      ],
      "correctIndex": 0,
      "explanation": "L'article 17 du r\xE8glement MAR impose une diffusion imm\xE9diate de l'information privil\xE9gi\xE9e.",
      "themeId": 4,
      "theme": "R\xE9glementation abus de march\xE9"
    },
    {
      "type": "C",
      "question": "Quelle pratique est consid\xE9r\xE9e comme une manipulation de march\xE9 au sens du r\xE8glement MAR ?",
      "choices": [
        "Utiliser une information privil\xE9gi\xE9e pour acheter des titres",
        "Passer des ordres sans intention de les ex\xE9cuter",
        "Publier des \xE9tats financiers annuels"
      ],
      "correctIndex": 1,
      "explanation": "Le spoofing, ordres sans intention d'ex\xE9cution, est une manipulation de march\xE9 interdite.",
      "themeId": 4,
      "theme": "R\xE9glementation abus de march\xE9"
    },
    {
      "type": "C",
      "question": "Quelle pratique de manipulation de march\xE9 consiste \xE0 passer des ordres d'achat et de vente sur le m\xEAme instrument pour cr\xE9er une activit\xE9 artificielle ?",
      "choices": [
        "Spoofing",
        "Pump and dump",
        "Wash trading"
      ],
      "correctIndex": 2,
      "explanation": "Le wash trading simule des transactions pour donner une fausse impression de liquidit\xE9.",
      "themeId": 4,
      "theme": "R\xE9glementation abus de march\xE9"
    },
    {
      "type": "C",
      "question": "Quel est le d\xE9lai maximal pour qu'une personne exer\xE7ant des responsabilit\xE9s dirigeantes notifie ses transactions \xE0 l'autorit\xE9 comp\xE9tente ?",
      "choices": [
        "1 jour ouvrable",
        "3 jours ouvrables",
        "5 jours ouvrables"
      ],
      "correctIndex": 1,
      "explanation": "Selon le r\xE8glement MAR, la notification doit intervenir dans les trois jours ouvrables suivant la transaction.",
      "themeId": 4,
      "theme": "R\xE9glementation abus de march\xE9"
    },
    {
      "type": "C",
      "question": "Selon le r\xE8glement MAR, quelle condition doit remplir une information pour \xEAtre consid\xE9r\xE9e comme privil\xE9gi\xE9e ?",
      "choices": [
        "\xCAtre pr\xE9cise, non publique et susceptible d'influencer le cours",
        "\xCAtre publique et susceptible d'influencer le cours",
        "\xCAtre pr\xE9cise et publique"
      ],
      "correctIndex": 0,
      "explanation": "Une information privil\xE9gi\xE9e doit \xEAtre pr\xE9cise, non rendue publique et susceptible d'influencer le cours des instruments financiers.",
      "themeId": 4,
      "theme": "R\xE9glementation abus de march\xE9"
    },
    {
      "type": "C",
      "question": "Qu'est-ce qu'une op\xE9ration de wash trade dans le cadre des manipulations de march\xE9 ?",
      "choices": [
        "Achat et vente simultan\xE9s d'un m\xEAme instrument par le m\xEAme intervenant",
        "Achat d'un instrument pour influencer le cours",
        "Vente d'un instrument sans d\xE9tention pr\xE9alable"
      ],
      "correctIndex": 0,
      "explanation": "Le wash trade consiste \xE0 acheter et vendre le m\xEAme instrument simultan\xE9ment pour cr\xE9er une fausse apparence de liquidit\xE9.",
      "themeId": 4,
      "theme": "R\xE9glementation abus de march\xE9"
    },
    {
      "type": "A",
      "question": "Pour \xE9valuer l'ad\xE9quation d'un instrument financier \xE0 un client, un prestataire de services d'investissement doit recueillir des informations sur :",
      "choices": [
        "les connaissances, l'exp\xE9rience, la situation financi\xE8re et les objectifs d'investissement du client.",
        "uniquement les connaissances et l'exp\xE9rience du client.",
        "uniquement la situation financi\xE8re et les objectifs d'investissement."
      ],
      "correctIndex": 0,
      "explanation": "L'ad\xE9quation requiert une \xE9valuation compl\xE8te du profil du client, incluant tous ces \xE9l\xE9ments.",
      "themeId": 5,
      "theme": "Commercialisation d'instruments financiers"
    },
    {
      "type": "A",
      "question": "En mati\xE8re de commercialisation de produits d'\xE9pargne, quel document doit \xEAtre remis \xE0 un client non professionnel avant la souscription d'un produit d'investissement packag\xE9 (PRIIP) ?",
      "choices": [
        "Le prospectus complet approuv\xE9 par l'Autorit\xE9 des march\xE9s financiers.",
        "Le document d'informations cl\xE9s (DIC) qui pr\xE9sente les caract\xE9ristiques essentielles et les risques du produit.",
        "Un rapport annuel de gestion du produit."
      ],
      "correctIndex": 1,
      "explanation": "Le DIC est obligatoire pour les PRIIPs, remis avant la souscription.",
      "themeId": 5,
      "theme": "Commercialisation d'instruments financiers"
    },
    {
      "type": "A",
      "question": "Un ordre \xE0 cours limit\xE9 d'achat de 100 actions \xE0 50 euros est plac\xE9. Le cours de l'action est actuellement de 52 euros. Que se passe-t-il ?",
      "choices": [
        "L'ordre est ex\xE9cut\xE9 imm\xE9diatement au cours de 52 euros.",
        "L'ordre reste en attente jusqu'\xE0 ce que le cours atteigne 50 euros ou moins.",
        "L'ordre est annul\xE9 automatiquement."
      ],
      "correctIndex": 1,
      "explanation": "Un ordre \xE0 cours limit\xE9 n'est ex\xE9cut\xE9 qu'au prix limite ou meilleur.",
      "themeId": 5,
      "theme": "Commercialisation d'instruments financiers"
    },
    {
      "type": "A",
      "question": "Pour un client de d\xE9tail, quel crit\xE8re est pr\xE9pond\xE9rant dans l'obligation de meilleure ex\xE9cution ?",
      "choices": [
        "Le co\xFBt total de la transaction.",
        "La rapidit\xE9 d'ex\xE9cution.",
        "La probabilit\xE9 d'ex\xE9cution."
      ],
      "correctIndex": 0,
      "explanation": "Pour les clients de d\xE9tail, le co\xFBt total est le crit\xE8re le plus important.",
      "themeId": 5,
      "theme": "Commercialisation d'instruments financiers"
    },
    {
      "type": "A",
      "question": "Dans le cadre de la commercialisation d'instruments financiers, quelle est l'obligation principale d'un conseiller en investissements financiers (CIF) ?",
      "choices": [
        "V\xE9rifier l'ad\xE9quation de l'instrument au profil de l'investisseur",
        "Garantir la performance de l'instrument",
        "Transmettre syst\xE9matiquement les ordres au march\xE9"
      ],
      "correctIndex": 0,
      "explanation": "Le CIF doit effectuer une \xE9valuation de l'ad\xE9quation (suitability) avant toute recommandation.",
      "themeId": 5,
      "theme": "Commercialisation d'instruments financiers"
    },
    {
      "type": "A",
      "question": "Lors de la commercialisation d'un OPCVM, quel document doit \xEAtre remis \xE0 l'investisseur avant la souscription ?",
      "choices": [
        "Le prospectus complet",
        "Le document d'information cl\xE9 pour l'investisseur (DICI)",
        "Le rapport annuel de gestion"
      ],
      "correctIndex": 1,
      "explanation": "Le DICI est obligatoire avant souscription, le prospectus est disponible mais pas syst\xE9matiquement remis.",
      "themeId": 5,
      "theme": "Commercialisation d'instruments financiers"
    },
    {
      "type": "C",
      "question": "Un ordre d'achat \xE0 cours limit\xE9 est ex\xE9cut\xE9 uniquement si le prix du march\xE9 est :",
      "choices": [
        "sup\xE9rieur ou \xE9gal au prix limite",
        "strictement sup\xE9rieur au prix limite",
        "inf\xE9rieur ou \xE9gal au prix limite"
      ],
      "correctIndex": 2,
      "explanation": "Pour un achat, l'ex\xE9cution n'a lieu que si le prix est au plus \xE9gal au prix limite.",
      "themeId": 5,
      "theme": "Commercialisation d'instruments financiers"
    },
    {
      "type": "C",
      "question": "Selon MIFID II, quelle est l'obligation principale d'un distributeur dans le cadre de la gouvernance produit ?",
      "choices": [
        "Ne distribuer que des produits \xE0 faible risque.",
        "D\xE9finir un march\xE9 cible et s'assurer que le produit est distribu\xE9 en coh\xE9rence avec celui-ci.",
        "S'assurer que le produit est rentable pour le distributeur."
      ],
      "correctIndex": 1,
      "explanation": "La gouvernance produit impose de d\xE9finir un march\xE9 cible et de v\xE9rifier la coh\xE9rence de la distribution.",
      "themeId": 5,
      "theme": "Commercialisation d'instruments financiers"
    },
    {
      "type": "C",
      "question": "Quelle est la r\xE8gle concernant les r\xE9trocessions (inducements) dans le cadre de la commercialisation de fonds ?",
      "choices": [
        "Elles sont interdites sauf si elles am\xE9liorent la qualit\xE9 du service et sont divulgu\xE9es.",
        "Elles sont autoris\xE9es sans condition.",
        "Elles sont interdites pour tous les clients."
      ],
      "correctIndex": 0,
      "explanation": "Les r\xE9trocessions sont permises si elles am\xE9liorent la qualit\xE9 et sont transparentes.",
      "themeId": 5,
      "theme": "Commercialisation d'instruments financiers"
    },
    {
      "type": "C",
      "question": "Quelle est la principale diff\xE9rence entre le test d'ad\xE9quation (suitability) et le test d'appropriation (appropriateness) ?",
      "choices": [
        "Le test d'appropriation est plus complet que le test d'ad\xE9quation.",
        "Les deux tests sont obligatoires pour le service d'ex\xE9cution seule.",
        "Le test d'ad\xE9quation \xE9value la situation financi\xE8re et les objectifs, tandis que l'appropriation ne v\xE9rifie que connaissances et exp\xE9rience."
      ],
      "correctIndex": 2,
      "explanation": "Le test d'ad\xE9quation est plus complet, incluant situation financi\xE8re et objectifs.",
      "themeId": 5,
      "theme": "Commercialisation d'instruments financiers"
    },
    {
      "type": "A",
      "question": "Quelle est l'obligation d'une entreprise d'investissement en mati\xE8re de gestion des conflits d'int\xE9r\xEAts ?",
      "choices": [
        "Elle doit les identifier et les pr\xE9venir, et informer le client si elle ne peut les \xE9viter.",
        "Elle doit les ignorer si le client est professionnel.",
        "Elle doit les d\xE9clarer \xE0 l'AMF avant toute transaction."
      ],
      "correctIndex": 0,
      "explanation": "L'entreprise doit pr\xE9venir les conflits et informer le client si elle ne peut les \xE9viter.",
      "themeId": 6,
      "theme": "Relations avec les clients"
    },
    {
      "type": "A",
      "question": "Quel est l'effet d'un ordre \xE0 cours limit\xE9 par rapport \xE0 un ordre au march\xE9 ?",
      "choices": [
        "Il garantit l'ex\xE9cution au prix indiqu\xE9 ou meilleur.",
        "Il ne garantit pas l'ex\xE9cution si le prix n'est pas atteint.",
        "Il est ex\xE9cut\xE9 imm\xE9diatement au meilleur prix disponible."
      ],
      "correctIndex": 1,
      "explanation": "Un ordre \xE0 cours limit\xE9 ne garantit pas l'ex\xE9cution si le prix n'est pas atteint.",
      "themeId": 6,
      "theme": "Relations avec les clients"
    },
    {
      "type": "A",
      "question": "Selon la r\xE9glementation, quelle est l'obligation d'une entreprise d'investissement concernant l'\xE9valuation de l'ad\xE9quation d'un service de conseil en investissement ?",
      "choices": [
        "Elle doit s'assurer que le client a les moyens financiers suffisants.",
        "Elle doit fournir un rapport annuel sur les performances.",
        "Elle doit recueillir des informations sur les connaissances et l'exp\xE9rience du client en mati\xE8re d'investissement."
      ],
      "correctIndex": 2,
      "explanation": "L'\xE9valuation d'ad\xE9quation exige de conna\xEEtre les connaissances et l'exp\xE9rience du client.",
      "themeId": 6,
      "theme": "Relations avec les clients"
    },
    {
      "type": "A",
      "question": "Quelle est la cons\xE9quence d'un ordre 'tout ou rien' ?",
      "choices": [
        "Il doit \xEAtre ex\xE9cut\xE9 en totalit\xE9 ou pas du tout.",
        "Il peut \xEAtre ex\xE9cut\xE9 partiellement.",
        "Il est ex\xE9cut\xE9 au prix du march\xE9."
      ],
      "correctIndex": 0,
      "explanation": "Un ordre tout ou rien ne peut \xEAtre ex\xE9cut\xE9 que si la totalit\xE9 de la quantit\xE9 est disponible.",
      "themeId": 6,
      "theme": "Relations avec les clients"
    },
    {
      "type": "A",
      "question": "Lors de la r\xE9ception d'un ordre de bourse, quelle obligation incombe \xE0 l'entreprise d'investissement ?",
      "choices": [
        "Enregistrer l'ordre imm\xE9diatement et le transmettre sans d\xE9lai",
        "Ne transmettre l'ordre qu'apr\xE8s confirmation \xE9crite du client",
        "Transmettre l'ordre uniquement si le client a un compte esp\xE8ces approvisionn\xE9"
      ],
      "correctIndex": 0,
      "explanation": "Les ordres doivent \xEAtre enregistr\xE9s et transmis sans d\xE9lai pour garantir la meilleure ex\xE9cution.",
      "themeId": 6,
      "theme": "Relations avec les clients"
    },
    {
      "type": "C",
      "question": "Quelle information doit obligatoirement figurer dans le relev\xE9 de compte p\xE9riodique envoy\xE9 au client ?",
      "choices": [
        "La valorisation des instruments financiers au prix de revient",
        "Le d\xE9tail des frais et commissions pr\xE9lev\xE9s sur la p\xE9riode",
        "La liste des ordres pass\xE9s par le client sur les cinq derni\xE8res ann\xE9es"
      ],
      "correctIndex": 1,
      "explanation": "Le relev\xE9 doit mentionner les frais et commissions pour assurer la transparence des co\xFBts.",
      "themeId": 6,
      "theme": "Relations avec les clients"
    },
    {
      "type": "C",
      "question": "Un client donne un ordre \xE0 cours limit\xE9 d'achat \xE0 50 \u20AC, alors que le cours est de 52 \u20AC. Que se passe-t-il ?",
      "choices": [
        "L'ordre est ex\xE9cut\xE9 imm\xE9diatement au cours de 52 \u20AC",
        "L'ordre est enregistr\xE9 et ne sera ex\xE9cut\xE9 que si le cours atteint 50 \u20AC ou moins",
        "L'ordre est rejet\xE9 car le prix limite est inf\xE9rieur au cours actuel"
      ],
      "correctIndex": 1,
      "explanation": "Un ordre \xE0 cours limit\xE9 n'est ex\xE9cut\xE9 qu'au prix limite ou meilleur, donc il attend une baisse du cours.",
      "themeId": 6,
      "theme": "Relations avec les clients"
    },
    {
      "type": "C",
      "question": "Dans le cadre de la gestion de portefeuille, quelle obligation incombe \xE0 la soci\xE9t\xE9 de gestion envers son client ?",
      "choices": [
        "Recueillir des informations sur la situation financi\xE8re, les objectifs et la tol\xE9rance au risque",
        "Se contenter d'une d\xE9claration du client sans v\xE9rification",
        "Ne pas demander d'informations si le client est professionnel"
      ],
      "correctIndex": 0,
      "explanation": "La soci\xE9t\xE9 de gestion doit \xE9valuer l'ad\xE9quation en recueillant ces informations.",
      "themeId": 6,
      "theme": "Relations avec les clients"
    },
    {
      "type": "C",
      "question": "Quelle est la caract\xE9ristique d'un ordre \xE0 cours limit\xE9 ?",
      "choices": [
        "Il garantit l'ex\xE9cution imm\xE9diate au prix du march\xE9",
        "Il est ex\xE9cut\xE9 au prix indiqu\xE9 ou \xE0 un prix plus favorable",
        "Il est ex\xE9cut\xE9 uniquement si le prix atteint le niveau indiqu\xE9"
      ],
      "correctIndex": 1,
      "explanation": "Un ordre \xE0 cours limit\xE9 est ex\xE9cut\xE9 au prix indiqu\xE9 ou \xE0 un prix plus favorable, sans garantie d'ex\xE9cution.",
      "themeId": 6,
      "theme": "Relations avec les clients"
    },
    {
      "type": "C",
      "question": "Que signifie l'obligation de 'meilleure ex\xE9cution' pour un prestataire de services d'investissement ?",
      "choices": [
        "Ex\xE9cuter les ordres dans l'ordre chronologique de r\xE9ception",
        "N\xE9gocier uniquement sur les march\xE9s r\xE9glement\xE9s",
        "Obtenir le meilleur r\xE9sultat possible en consid\xE9rant prix, co\xFBts, rapidit\xE9 et probabilit\xE9"
      ],
      "correctIndex": 2,
      "explanation": "La meilleure ex\xE9cution exige de prendre en compte plusieurs crit\xE8res pour obtenir le meilleur r\xE9sultat pour le client.",
      "themeId": 6,
      "theme": "Relations avec les clients"
    },
    {
      "type": "C",
      "question": "Quelle caract\xE9ristique distingue un security token d'un utility token ?",
      "choices": [
        "Le security token conf\xE8re des droits financiers ou de gouvernance sur un actif sous-jacent",
        "Le utility token est toujours \xE9mis par une autorit\xE9 publique",
        "Le security token ne peut \xEAtre \xE9chang\xE9 que sur des plateformes r\xE9gul\xE9es"
      ],
      "correctIndex": 0,
      "explanation": "Un security token repr\xE9sente un investissement et donne des droits \xE9conomiques, contrairement \xE0 un utility token qui donne acc\xE8s \xE0 un service.",
      "themeId": 7,
      "theme": "Instruments financiers et crypto-actifs"
    },
    {
      "type": "C",
      "question": "Quel est le principal risque d'un stablecoin adoss\xE9 \xE0 des r\xE9serves de monnaie fiduciaire ?",
      "choices": [
        "La volatilit\xE9 de la crypto-monnaie sous-jacente",
        "La d\xE9faillance du d\xE9positaire ou la non-v\xE9rification des r\xE9serves",
        "L'absence de r\xE9glementation sur les \xE9changes"
      ],
      "correctIndex": 1,
      "explanation": "Le risque r\xE9side dans la confiance en la d\xE9tention effective des r\xE9serves, car une couverture insuffisante peut entra\xEEner une perte de parit\xE9.",
      "themeId": 7,
      "theme": "Instruments financiers et crypto-actifs"
    },
    {
      "type": "C",
      "question": "Dans le cadre de la tokenisation d'un actif immobilier, que repr\xE9sente le jeton \xE9mis ?",
      "choices": [
        "Une unit\xE9 de compte virtuelle sans valeur l\xE9gale",
        "Une fraction de propri\xE9t\xE9 de l'actif sous-jacent",
        "Un simple moyen de paiement pour l'achat de l'actif"
      ],
      "correctIndex": 1,
      "explanation": "La tokenisation fractionne la propri\xE9t\xE9 d'un actif r\xE9el en jetons, chacun repr\xE9sentant une part de cet actif.",
      "themeId": 7,
      "theme": "Instruments financiers et crypto-actifs"
    },
    {
      "type": "C",
      "question": "Quelle est la cons\xE9quence directe de la forte volatilit\xE9 des crypto-actifs sur leur utilisation comme monnaie ?",
      "choices": [
        "Ils deviennent plus attractifs pour les transactions quotidiennes",
        "Leur valeur de r\xE9f\xE9rence instable rend difficile leur fonction d'unit\xE9 de compte",
        "Ils sont automatiquement index\xE9s sur l'inflation"
      ],
      "correctIndex": 1,
      "explanation": "Une monnaie doit \xEAtre stable pour servir de mesure de valeur ; la volatilit\xE9 compromet cette fonction.",
      "themeId": 7,
      "theme": "Instruments financiers et crypto-actifs"
    },
    {
      "type": "C",
      "question": "Comment calcule-t-on la capitalisation boursi\xE8re d'un crypto-actif ?",
      "choices": [
        "Prix \xD7 offre en circulation",
        "Prix \xD7 offre totale",
        "Prix \xD7 volume \xE9chang\xE9"
      ],
      "correctIndex": 0,
      "explanation": "La capitalisation boursi\xE8re est le produit du prix par l'offre en circulation.",
      "themeId": 7,
      "theme": "Instruments financiers et crypto-actifs"
    },
    {
      "type": "C",
      "question": "Quelle est la principale distinction entre un security token et un utility token ?",
      "choices": [
        "Le security token est soumis \xE0 MiCA, l'utility token en est exempt",
        "Le security token conf\xE8re des droits financiers, l'utility token donne acc\xE8s \xE0 un service",
        "Le security token est \xE9mis sur une blockchain priv\xE9e, l'utility token sur une blockchain publique"
      ],
      "correctIndex": 1,
      "explanation": "Un security token repr\xE9sente un investissement, tandis qu'un utility token donne acc\xE8s \xE0 un produit ou service.",
      "themeId": 7,
      "theme": "Instruments financiers et crypto-actifs"
    },
    {
      "type": "C",
      "question": "Quelle est la diff\xE9rence fondamentale entre une 'coin' et un 'token' dans l'\xE9cosyst\xE8me crypto ?",
      "choices": [
        "Une coin est fongible, un token est non fongible",
        "Une coin est une monnaie l\xE9gale, un token est une monnaie priv\xE9e",
        "Une coin poss\xE8de sa propre blockchain, un token utilise une blockchain existante"
      ],
      "correctIndex": 2,
      "explanation": "Les coins ont leur propre blockchain, les tokens sont \xE9mis sur des blockchains existantes.",
      "themeId": 7,
      "theme": "Instruments financiers et crypto-actifs"
    },
    {
      "type": "C",
      "question": "Dans un DEX, quel m\xE9canisme d\xE9termine le prix d'un actif dans un pool de liquidit\xE9 ?",
      "choices": [
        "La formule du produit constant (x*y=k)",
        "Le carnet d'ordres centralis\xE9 de l'exchange",
        "Le prix moyen pond\xE9r\xE9 des transactions pass\xE9es"
      ],
      "correctIndex": 0,
      "explanation": "La formule x*y=k maintient l'\xE9quilibre des r\xE9serves et d\xE9termine le prix.",
      "themeId": 7,
      "theme": "Instruments financiers et crypto-actifs"
    },
    {
      "type": "C",
      "question": "Quelle est la principale caract\xE9ristique d'un jeton utilitaire (utility token) ?",
      "choices": [
        "Il conf\xE8re des droits de propri\xE9t\xE9 sur l'entreprise",
        "Il donne acc\xE8s \xE0 un service ou une fonctionnalit\xE9",
        "Il est adoss\xE9 \xE0 une monnaie fiduciaire"
      ],
      "correctIndex": 1,
      "explanation": "Un utility token est con\xE7u pour donner acc\xE8s \xE0 un produit ou service.",
      "themeId": 7,
      "theme": "Instruments financiers et crypto-actifs"
    },
    {
      "type": "C",
      "question": "Quel est le r\xF4le d'un oracle dans un smart contract ?",
      "choices": [
        "Il ex\xE9cute automatiquement les transactions",
        "Il s\xE9curise le portefeuille de l'utilisateur",
        "Il fournit des donn\xE9es externes au contrat"
      ],
      "correctIndex": 2,
      "explanation": "Un oracle relie la blockchain aux donn\xE9es du monde r\xE9el.",
      "themeId": 7,
      "theme": "Instruments financiers et crypto-actifs"
    },
    {
      "type": "C",
      "question": "Quel est le principe fondamental de la s\xE9paration des actifs dans un compte de tiers ?",
      "choices": [
        "Les actifs sont confondus avec ceux de la soci\xE9t\xE9 de gestion.",
        "Les actifs sont conserv\xE9s par un d\xE9positaire distinct.",
        "Les actifs sont g\xE9r\xE9s par le d\xE9positaire."
      ],
      "correctIndex": 1,
      "explanation": "La s\xE9paration des actifs impose un d\xE9positaire distinct pour prot\xE9ger les investisseurs.",
      "themeId": 8,
      "theme": "Gestion collective / compte de tiers"
    },
    {
      "type": "C",
      "question": "Dans un FCP, qui est responsable de la valorisation des actifs ?",
      "choices": [
        "La soci\xE9t\xE9 de gestion.",
        "Le d\xE9positaire.",
        "L'auditeur."
      ],
      "correctIndex": 0,
      "explanation": "La soci\xE9t\xE9 de gestion est responsable de la valorisation, sous contr\xF4le du d\xE9positaire.",
      "themeId": 8,
      "theme": "Gestion collective / compte de tiers"
    },
    {
      "type": "C",
      "question": "Quelle est la cons\xE9quence d'un ordre de souscription re\xE7u apr\xE8s l'heure limite de centralisation ?",
      "choices": [
        "Il est ex\xE9cut\xE9 au prix du jour m\xEAme.",
        "Il est annul\xE9.",
        "Il est ex\xE9cut\xE9 au prix du jour suivant."
      ],
      "correctIndex": 2,
      "explanation": "Les ordres re\xE7us apr\xE8s l'heure limite sont trait\xE9s sur la valeur liquidative suivante.",
      "themeId": 8,
      "theme": "Gestion collective / compte de tiers"
    },
    {
      "type": "C",
      "question": "Quel est le r\xF4le principal d'un d\xE9positaire dans la gestion collective ?",
      "choices": [
        "G\xE9rer les investissements du fonds.",
        "Conserver les actifs et contr\xF4ler la r\xE9gularit\xE9 des d\xE9cisions.",
        "Fixer la valeur liquidative."
      ],
      "correctIndex": 1,
      "explanation": "Le d\xE9positaire conserve les actifs et veille \xE0 la conformit\xE9 des d\xE9cisions de gestion.",
      "themeId": 8,
      "theme": "Gestion collective / compte de tiers"
    },
    {
      "type": "C",
      "question": "Dans un OPCVM indiciel, quel est l'impact d'une frais de gestion \xE9lev\xE9e sur la performance nette par rapport \xE0 l'indice de r\xE9f\xE9rence ?",
      "choices": [
        "Elle am\xE9liore la performance nette si l'indice monte",
        "Elle r\xE9duit la performance nette, m\xEAme si l'indice est stable",
        "Elle n'a aucun impact si l'indice est volatil"
      ],
      "correctIndex": 1,
      "explanation": "Les frais de gestion sont pr\xE9lev\xE9s en permanence, r\xE9duisant la performance nette quel que soit le mouvement de l'indice.",
      "themeId": 8,
      "theme": "Gestion collective / compte de tiers"
    },
    {
      "type": "C",
      "question": "Un compte de tiers g\xE9r\xE9 par un d\xE9positaire central (par exemple Euroclear) est utilis\xE9 principalement pour :",
      "choices": [
        "D\xE9tenir des titres pour le compte d'autres d\xE9positaires ou teneurs de compte",
        "Enregistrer les transactions des investisseurs particuliers",
        "G\xE9rer les ordres de bourse des soci\xE9t\xE9s de gestion"
      ],
      "correctIndex": 0,
      "explanation": "Le compte de tiers permet au d\xE9positaire central de d\xE9tenir des titres pour le compte d'interm\xE9diaires financiers.",
      "themeId": 8,
      "theme": "Gestion collective / compte de tiers"
    },
    {
      "type": "C",
      "question": "Dans une SICAV, la valeur liquidative (VL) est calcul\xE9e en divisant l'actif net par le nombre de parts. Que se passe-t-il si des souscriptions importantes arrivent apr\xE8s le calcul de la VL ?",
      "choices": [
        "Les nouvelles souscriptions sont trait\xE9es \xE0 la VL du jour suivant",
        "Les nouvelles souscriptions sont trait\xE9es \xE0 la VL du jour m\xEAme",
        "Les souscriptions sont suspendues jusqu'\xE0 la prochaine VL"
      ],
      "correctIndex": 0,
      "explanation": "Les ordres re\xE7us apr\xE8s la centralisation sont ex\xE9cut\xE9s \xE0 la prochaine VL, conform\xE9ment au principe de l'ex\xE9cution \xE0 cours inconnu.",
      "themeId": 8,
      "theme": "Gestion collective / compte de tiers"
    },
    {
      "type": "C",
      "question": "Dans la gestion collective, quel est le r\xF4le principal du compte de tiers ?",
      "choices": [
        "Isoler les actifs des investisseurs de ceux de la soci\xE9t\xE9 de gestion",
        "Permettre des op\xE9rations de pr\xEAt de titres aux investisseurs",
        "Garantir un rendement minimal aux porteurs de parts"
      ],
      "correctIndex": 0,
      "explanation": "Le compte de tiers assure la s\xE9gr\xE9gation des actifs, prot\xE9geant les investisseurs en cas de faillite de la soci\xE9t\xE9 de gestion.",
      "themeId": 8,
      "theme": "Gestion collective / compte de tiers"
    },
    {
      "type": "C",
      "question": "Quelle est une obligation du d\xE9positaire d'un OPCVM ?",
      "choices": [
        "Fixer la valeur liquidative chaque jour",
        "Assurer la conservation des actifs et le contr\xF4le de la r\xE9gularit\xE9 des d\xE9cisions",
        "Commercialiser les parts aupr\xE8s des investisseurs"
      ],
      "correctIndex": 1,
      "explanation": "Le d\xE9positaire a une double mission de conservation et de contr\xF4le, distincte de la gestion et de la commercialisation.",
      "themeId": 8,
      "theme": "Gestion collective / compte de tiers"
    },
    {
      "type": "C",
      "question": "Quelle est la limite maximale de d\xE9tention d'un m\xEAme \xE9metteur pour un OPCVM de droit fran\xE7ais ?",
      "choices": [
        "5% de l'actif",
        "10% de l'actif",
        "20% de l'actif"
      ],
      "correctIndex": 2,
      "explanation": "La r\xE9glementation limite \xE0 10% de l'actif la d\xE9tention de titres d'un m\xEAme \xE9metteur pour un OPCVM.",
      "themeId": 8,
      "theme": "Gestion collective / compte de tiers"
    },
    {
      "type": "C",
      "question": "Quelle affirmation concernant un ordre \xE0 cours limit\xE9 est exacte ?",
      "choices": [
        "Il garantit le prix mais pas l'ex\xE9cution",
        "Il garantit l'ex\xE9cution mais pas le prix",
        "Il garantit \xE0 la fois le prix et l'ex\xE9cution"
      ],
      "correctIndex": 0,
      "explanation": "Un ordre \xE0 cours limit\xE9 s'ex\xE9cute uniquement au prix indiqu\xE9 ou meilleur, sans garantie d'ex\xE9cution.",
      "themeId": 9,
      "theme": "Fonctionnement et organisation des march\xE9s"
    },
    {
      "type": "C",
      "question": "Comment est calcul\xE9 un indice pond\xE9r\xE9 par la capitalisation ?",
      "choices": [
        "En donnant un poids \xE9gal \xE0 chaque action",
        "En pond\xE9rant par la valeur de march\xE9 des titres",
        "En pond\xE9rant par le volume de transactions"
      ],
      "correctIndex": 1,
      "explanation": "Un indice pond\xE9r\xE9 par la capitalisation donne un poids proportionnel \xE0 la valeur boursi\xE8re de chaque titre.",
      "themeId": 9,
      "theme": "Fonctionnement et organisation des march\xE9s"
    },
    {
      "type": "C",
      "question": "Quel est l'effet d'une augmentation de la liquidit\xE9 sur la fourchette de prix (spread) ?",
      "choices": [
        "Elle \xE9largit le spread",
        "Elle r\xE9duit le spread",
        "Elle n'a aucun effet sur le spread"
      ],
      "correctIndex": 2,
      "explanation": "Une liquidit\xE9 accrue resserre le spread, car le co\xFBt de transaction diminue.",
      "themeId": 9,
      "theme": "Fonctionnement et organisation des march\xE9s"
    },
    {
      "type": "C",
      "question": "Selon l'hypoth\xE8se d'efficience des march\xE9s, quelle affirmation est vraie ?",
      "choices": [
        "Les cours refl\xE8tent toute l'information disponible",
        "Les cours sont influenc\xE9s par les rumeurs",
        "Les cours sont d\xE9termin\xE9s par les fondamentaux uniquement"
      ],
      "correctIndex": 0,
      "explanation": "L'efficience informationnelle implique que les prix int\xE8grent instantan\xE9ment toute information pertinente.",
      "themeId": 9,
      "theme": "Fonctionnement et organisation des march\xE9s"
    },
    {
      "type": "C",
      "question": "Quel est le r\xF4le d'une contrepartie centrale (CCP) dans un march\xE9 organis\xE9 ?",
      "choices": [
        "Elle fixe les prix d'\xE9quilibre lors de l'ouverture",
        "Elle garantit la bonne fin des transactions en se substituant aux parties",
        "Elle surveille les abus de march\xE9 en analysant les ordres"
      ],
      "correctIndex": 1,
      "explanation": "La CCP s'interpose entre acheteurs et vendeurs pour garantir l'ex\xE9cution des transactions.",
      "themeId": 9,
      "theme": "Fonctionnement et organisation des march\xE9s"
    },
    {
      "type": "C",
      "question": "Un ordre d'achat \xE0 cours limit\xE9 est ex\xE9cut\xE9 si le prix du march\xE9 est...",
      "choices": [
        "inf\xE9rieur ou \xE9gal au prix limite",
        "sup\xE9rieur ou \xE9gal au prix limite",
        "exactement \xE9gal au prix limite"
      ],
      "correctIndex": 0,
      "explanation": "Un ordre \xE0 cours limit\xE9 d'achat ne s'ex\xE9cute qu'\xE0 un prix inf\xE9rieur ou \xE9gal \xE0 la limite fix\xE9e.",
      "themeId": 9,
      "theme": "Fonctionnement et organisation des march\xE9s"
    },
    {
      "type": "C",
      "question": "Dans un march\xE9 dirig\xE9 par les ordres, le carnet d'ordres central sert \xE0...",
      "choices": [
        "enregistrer les transactions hors march\xE9",
        "surveiller les positions des membres",
        "apparier les ordres d'achat et de vente selon des r\xE8gles de priorit\xE9"
      ],
      "correctIndex": 2,
      "explanation": "Le carnet d'ordres central est le m\xE9canisme de confrontation des ordres qui d\xE9termine les prix.",
      "themeId": 9,
      "theme": "Fonctionnement et organisation des march\xE9s"
    },
    {
      "type": "C",
      "question": "Quelle est la cons\xE9quence d'un ordre d'achat \xE0 cours limit\xE9 dont le prix est sup\xE9rieur au meilleur prix vendeur ?",
      "choices": [
        "Il est ex\xE9cut\xE9 imm\xE9diatement au meilleur prix vendeur",
        "Il reste en carnet d'ordres en attente",
        "Il est ex\xE9cut\xE9 au prix limite"
      ],
      "correctIndex": 0,
      "explanation": "Un ordre d'achat \xE0 cours limit\xE9 au-dessus du meilleur vendeur est ex\xE9cutable imm\xE9diatement au meilleur prix disponible.",
      "themeId": 9,
      "theme": "Fonctionnement et organisation des march\xE9s"
    },
    {
      "type": "C",
      "question": "Dans un syst\xE8me de n\xE9gociation avec fixing, comment est d\xE9termin\xE9 le prix d'\xE9quilibre ?",
      "choices": [
        "Par le dernier prix n\xE9goci\xE9",
        "Par le prix qui maximise le volume d'ordres ex\xE9cut\xE9s",
        "Par la moyenne des prix limites"
      ],
      "correctIndex": 1,
      "explanation": "Le fixing d\xE9termine le prix qui maximise le volume d'ordres ex\xE9cut\xE9s, \xE9quilibrant offre et demande.",
      "themeId": 9,
      "theme": "Fonctionnement et organisation des march\xE9s"
    },
    {
      "type": "C",
      "question": "Un indice \xE0 pond\xE9ration \xE9gale (equal weight) accorde \xE0 chaque composant...",
      "choices": [
        "Un poids proportionnel \xE0 sa capitalisation",
        "Un poids inversement proportionnel \xE0 sa volatilit\xE9",
        "Un poids identique"
      ],
      "correctIndex": 2,
      "explanation": "Dans un indice \xE0 pond\xE9ration \xE9gale, chaque action a le m\xEAme poids, ind\xE9pendamment de sa capitalisation.",
      "themeId": 9,
      "theme": "Fonctionnement et organisation des march\xE9s"
    },
    {
      "type": "C",
      "question": "Quel est l'objectif principal du m\xE9canisme de livraison contre paiement (DVP) dans le r\xE8glement-livraison ?",
      "choices": [
        "\xC9liminer le risque de principal",
        "R\xE9duire les frais de transaction",
        "Acc\xE9l\xE9rer la vitesse de r\xE8glement"
      ],
      "correctIndex": 0,
      "explanation": "Le DVP lie la livraison des titres au paiement, supprimant le risque de principal.",
      "themeId": 10,
      "theme": "Post-march\xE9 et infrastructures de march\xE9"
    },
    {
      "type": "C",
      "question": "Dans l'Union europ\xE9enne, quel est le d\xE9lai standard de r\xE8glement-livraison pour les transactions sur titres ?",
      "choices": [
        "J+1",
        "J+2",
        "J+3"
      ],
      "correctIndex": 1,
      "explanation": "Depuis 2014, le r\xE8glement-livraison standard est de T+2 jours ouvr\xE9s.",
      "themeId": 10,
      "theme": "Post-march\xE9 et infrastructures de march\xE9"
    },
    {
      "type": "C",
      "question": "Quel est le r\xF4le d'une contrepartie centrale (CCP) dans une op\xE9ration de march\xE9 ?",
      "choices": [
        "Elle fournit des services de conservation de titres",
        "Elle fixe les prix des instruments financiers",
        "Elle garantit la bonne fin des transactions en devenant acheteur et vendeur"
      ],
      "correctIndex": 2,
      "explanation": "La CCP s'interpose entre les parties, devenant contrepartie de chacune, r\xE9duisant le risque de contrepartie.",
      "themeId": 10,
      "theme": "Post-march\xE9 et infrastructures de march\xE9"
    },
    {
      "type": "C",
      "question": "Quelle est la principale caract\xE9ristique de TARGET2-Securities (T2S) ?",
      "choices": [
        "C'est un syst\xE8me de r\xE8glement-livraison de titres en monnaie de banque centrale",
        "C'est un syst\xE8me de compensation multilat\xE9rale",
        "C'est un syst\xE8me de n\xE9gociation d'actions"
      ],
      "correctIndex": 0,
      "explanation": "T2S est une plateforme de r\xE8glement-livraison de titres en monnaie de banque centrale.",
      "themeId": 10,
      "theme": "Post-march\xE9 et infrastructures de march\xE9"
    },
    {
      "type": "C",
      "question": "Quel est l'effet principal de la compensation multilat\xE9rale sur les transactions de gr\xE9 \xE0 gr\xE9 ?",
      "choices": [
        "Elle r\xE9duit le nombre de transactions \xE0 r\xE9gler en nettant les positions.",
        "Elle augmente le risque de contrepartie en multipliant les expositions.",
        "Elle \xE9limine tout besoin de garanties pour les membres."
      ],
      "correctIndex": 0,
      "explanation": "La compensation nette les obligations r\xE9ciproques, r\xE9duisant ainsi le volume des r\xE8glements.",
      "themeId": 10,
      "theme": "Post-march\xE9 et infrastructures de march\xE9"
    },
    {
      "type": "C",
      "question": "Dans un syst\xE8me de r\xE8glement-livraison, que garantit le principe de livraison contre paiement (DVP) ?",
      "choices": [
        "Que les titres sont livr\xE9s avant le paiement, avec un d\xE9lai de gr\xE2ce.",
        "Que le transfert de titres et le paiement sont simultan\xE9s et irr\xE9vocables.",
        "Que le paiement est effectu\xE9 avant la livraison, sans condition."
      ],
      "correctIndex": 1,
      "explanation": "Le DVP assure la simultan\xE9it\xE9 des deux flux, \xE9liminant le risque principal.",
      "themeId": 10,
      "theme": "Post-march\xE9 et infrastructures de march\xE9"
    },
    {
      "type": "C",
      "question": "Quel est le r\xF4le principal d'une contrepartie centrale (CCP) dans une op\xE9ration de march\xE9 ?",
      "choices": [
        "Elle agit comme un simple interm\xE9diaire sans assumer de risque.",
        "Elle garantit uniquement la livraison des titres, pas le paiement.",
        "Elle se substitue aux deux parties, devenant l'acheteur et le vendeur."
      ],
      "correctIndex": 2,
      "explanation": "La CCP s'interpose entre les parties, assumant le risque de contrepartie.",
      "themeId": 10,
      "theme": "Post-march\xE9 et infrastructures de march\xE9"
    },
    {
      "type": "C",
      "question": "Dans le processus de r\xE8glement-livraison, quel est le r\xF4le principal d'un d\xE9positaire central ?",
      "choices": [
        "Garantir la contrepartie en cas de d\xE9faut",
        "Conserver les titres et assurer leur transfert",
        "Fixer les prix des transactions"
      ],
      "correctIndex": 1,
      "explanation": "Le d\xE9positaire central d\xE9tient les titres et facilite leur transfert lors du r\xE8glement.",
      "themeId": 10,
      "theme": "Post-march\xE9 et infrastructures de march\xE9"
    },
    {
      "type": "C",
      "question": "Quelle est la cons\xE9quence d'un d\xE9faut de paiement d'un membre compensateur aupr\xE8s d'une chambre de compensation ?",
      "choices": [
        "La chambre annule toutes les transactions du membre",
        "La chambre utilise le fonds de garantie pour couvrir les pertes",
        "La chambre transf\xE8re les positions \xE0 un autre membre sans frais"
      ],
      "correctIndex": 1,
      "explanation": "Le fonds de garantie mutualis\xE9 sert \xE0 absorber les pertes en cas de d\xE9faut d'un membre.",
      "themeId": 10,
      "theme": "Post-march\xE9 et infrastructures de march\xE9"
    },
    {
      "type": "C",
      "question": "En Europe, le d\xE9lai standard de r\xE8glement-livraison pour les actions est de combien de jours apr\xE8s la date de transaction ?",
      "choices": [
        "T+1",
        "T+2",
        "T+3"
      ],
      "correctIndex": 1,
      "explanation": "Le r\xE8glement-livraison standard est T+2 pour les actions sur les march\xE9s europ\xE9ens.",
      "themeId": 10,
      "theme": "Post-march\xE9 et infrastructures de march\xE9"
    },
    {
      "type": "C",
      "question": "Lors d'une augmentation de capital par \xE9mission de droits pr\xE9f\xE9rentiels de souscription, un actionnaire qui ne souhaite pas souscrire peut-il vendre ses droits ?",
      "choices": [
        "Oui, les droits sont n\xE9gociables sur le march\xE9 pendant la p\xE9riode de souscription",
        "Non, les droits sont obligatoirement exerc\xE9s ou perdus",
        "Oui, mais uniquement aupr\xE8s de la soci\xE9t\xE9 \xE9mettrice"
      ],
      "correctIndex": 0,
      "explanation": "Les droits pr\xE9f\xE9rentiels de souscription sont des titres n\xE9gociables et peuvent \xEAtre c\xE9d\xE9s sur le march\xE9.",
      "themeId": 11,
      "theme": "\xC9missions et op\xE9rations sur titres"
    },
    {
      "type": "C",
      "question": "Quel est l'effet d'une division de la valeur nominale d'une action (split) sur le capital social d'une soci\xE9t\xE9 ?",
      "choices": [
        "Le capital social augmente proportionnellement",
        "Le capital social reste inchang\xE9",
        "Le capital social diminue en raison des frais"
      ],
      "correctIndex": 1,
      "explanation": "Un split modifie le nombre d'actions mais pas le montant total du capital social.",
      "themeId": 11,
      "theme": "\xC9missions et op\xE9rations sur titres"
    },
    {
      "type": "C",
      "question": "Dans le cadre d'une \xE9mission obligataire \xE0 taux variable, le coupon est g\xE9n\xE9ralement index\xE9 sur quel type de taux ?",
      "choices": [
        "Un taux fixe d\xE9termin\xE9 \xE0 l'\xE9mission",
        "Un taux de r\xE9f\xE9rence du march\xE9 mon\xE9taire ou obligataire",
        "Le taux de rendement des actions de l'\xE9metteur"
      ],
      "correctIndex": 1,
      "explanation": "Le coupon variable est r\xE9vis\xE9 p\xE9riodiquement selon un taux de r\xE9f\xE9rence comme l'Euribor ou l'OAT.",
      "themeId": 11,
      "theme": "\xC9missions et op\xE9rations sur titres"
    },
    {
      "type": "C",
      "question": "Quelle est la cons\xE9quence d'une offre publique de rachat (OPR) r\xE9ussie sur le flottant d'une soci\xE9t\xE9 cot\xE9e ?",
      "choices": [
        "Le flottant augmente car les actions sont redistribu\xE9es",
        "Le flottant diminue car l'initiateur d\xE9tient une part plus importante",
        "Le flottant reste identique car les actions sont annul\xE9es"
      ],
      "correctIndex": 1,
      "explanation": "L'OPR r\xE9duit le nombre d'actions en circulation hors de l'initiateur, donc le flottant baisse.",
      "themeId": 11,
      "theme": "\xC9missions et op\xE9rations sur titres"
    },
    {
      "type": "C",
      "question": "Lors d'une augmentation de capital avec maintien du droit pr\xE9f\xE9rentiel de souscription, le prix d'\xE9mission des actions nouvelles est g\xE9n\xE9ralement...",
      "choices": [
        "sup\xE9rieur au cours de bourse",
        "inf\xE9rieur au cours de bourse",
        "\xE9gal au cours de bourse"
      ],
      "correctIndex": 1,
      "explanation": "Le prix d'\xE9mission est fix\xE9 en dessous du cours de bourse pour inciter les actionnaires \xE0 exercer leurs droits.",
      "themeId": 11,
      "theme": "\xC9missions et op\xE9rations sur titres"
    },
    {
      "type": "C",
      "question": "Quel est l'effet d'une augmentation de capital par incorporation de r\xE9serves sur le nombre d'actions ?",
      "choices": [
        "Le nombre d'actions augmente",
        "Le nombre d'actions diminue",
        "Le nombre d'actions reste inchang\xE9"
      ],
      "correctIndex": 0,
      "explanation": "L'incorporation de r\xE9serves \xE9met de nouvelles actions gratuites, augmentant le nombre d'actions sans modification du capital.",
      "themeId": 11,
      "theme": "\xC9missions et op\xE9rations sur titres"
    },
    {
      "type": "C",
      "question": "Lors de l'\xE9mission d'une obligation \xE0 taux fixe, si le taux de march\xE9 est inf\xE9rieur au taux nominal, le prix d'\xE9mission sera...",
      "choices": [
        "inf\xE9rieur au pair",
        "\xE9gal au pair",
        "sup\xE9rieur au pair"
      ],
      "correctIndex": 2,
      "explanation": "Pour compenser un taux nominal sup\xE9rieur, l'obligation est \xE9mise avec une prime, donc au-dessus du pair.",
      "themeId": 11,
      "theme": "\xC9missions et op\xE9rations sur titres"
    },
    {
      "type": "C",
      "question": "Lors d'une augmentation de capital avec droit pr\xE9f\xE9rentiel de souscription (DPS), quel est l'effet imm\xE9diat pour un actionnaire existant qui ne souscrit pas ?",
      "choices": [
        "Il re\xE7oit une compensation en esp\xE8ces \xE9quivalente \xE0 la valeur du DPS",
        "Il subit une dilution de sa participation, mais peut vendre ses DPS pour compenser",
        "Il conserve automatiquement sa part si le nombre d'actions est inchang\xE9"
      ],
      "correctIndex": 1,
      "explanation": "Sans souscription, la part relative diminue, mais la vente des DPS compense partiellement la dilution.",
      "themeId": 11,
      "theme": "\xC9missions et op\xE9rations sur titres"
    },
    {
      "type": "C",
      "question": "Quelle est la cons\xE9quence d'un split (division du nominal) sur le capital social d'une soci\xE9t\xE9 ?",
      "choices": [
        "Le capital social augmente proportionnellement au nombre de nouvelles actions",
        "Le capital social reste inchang\xE9, mais le nombre d'actions augmente",
        "Le capital social diminue car la valeur nominale est r\xE9duite"
      ],
      "correctIndex": 1,
      "explanation": "Un split modifie le nombre d'actions et le nominal, mais le capital social total reste identique.",
      "themeId": 11,
      "theme": "\xC9missions et op\xE9rations sur titres"
    },
    {
      "type": "C",
      "question": "Dans une OPA (offre publique d'achat), quel est le r\xF4le de l'AMF ?",
      "choices": [
        "Elle fixe le prix d'achat des titres vis\xE9s",
        "Elle garantit le succ\xE8s de l'offre en achetant les titres non apport\xE9s",
        "Elle contr\xF4le la r\xE9gularit\xE9 et l'information diffus\xE9e pendant l'offre"
      ],
      "correctIndex": 2,
      "explanation": "L'AMF supervise la transparence et le respect des r\xE8gles, sans fixer le prix ni garantir l'offre.",
      "themeId": 11,
      "theme": "\xC9missions et op\xE9rations sur titres"
    },
    {
      "type": "C",
      "question": "Dans le bilan comptable, quelle relation fondamentale est toujours v\xE9rifi\xE9e ?",
      "choices": [
        "Actif = Passif - Capitaux propres",
        "Actif = Passif + Capitaux propres",
        "Actif + Passif = Capitaux propres"
      ],
      "correctIndex": 1,
      "explanation": "L'\xE9quation fondamentale du bilan est Actif = Passif + Capitaux propres.",
      "themeId": 12,
      "theme": "Bases comptables et financi\xE8res"
    },
    {
      "type": "C",
      "question": "Quelle est la principale diff\xE9rence entre le r\xE9sultat comptable et la tr\xE9sorerie nette ?",
      "choices": [
        "Le r\xE9sultat inclut les charges non d\xE9caiss\xE9es comme les amortissements",
        "La tr\xE9sorerie inclut les produits non encaiss\xE9s",
        "Ils sont toujours identiques"
      ],
      "correctIndex": 0,
      "explanation": "Le r\xE9sultat comptable int\xE8gre des charges calcul\xE9es sans sortie de tr\xE9sorerie, contrairement \xE0 la tr\xE9sorerie.",
      "themeId": 12,
      "theme": "Bases comptables et financi\xE8res"
    },
    {
      "type": "C",
      "question": "Quel est l'effet d'une dotation aux amortissements sur le r\xE9sultat et la tr\xE9sorerie ?",
      "choices": [
        "Diminue le r\xE9sultat et diminue la tr\xE9sorerie",
        "Augmente le r\xE9sultat et n'affecte pas la tr\xE9sorerie",
        "Diminue le r\xE9sultat mais n'affecte pas la tr\xE9sorerie"
      ],
      "correctIndex": 2,
      "explanation": "L'amortissement est une charge non d\xE9caiss\xE9e : il r\xE9duit le r\xE9sultat sans impact sur la tr\xE9sorerie.",
      "themeId": 12,
      "theme": "Bases comptables et financi\xE8res"
    },
    {
      "type": "C",
      "question": "Le ratio de liquidit\xE9 g\xE9n\xE9rale se calcule comme :",
      "choices": [
        "Tr\xE9sorerie / Passif circulant",
        "Actif circulant / Passif circulant",
        "Capitaux propres / Total du bilan"
      ],
      "correctIndex": 1,
      "explanation": "La liquidit\xE9 g\xE9n\xE9rale compare l'actif circulant au passif circulant pour mesurer la solvabilit\xE9 \xE0 court terme.",
      "themeId": 12,
      "theme": "Bases comptables et financi\xE8res"
    },
    {
      "type": "C",
      "question": "Une entreprise acquiert une machine pour 20 000 \u20AC, sans valeur r\xE9siduelle, amortissable sur 4 ans en lin\xE9aire. Quel est l'amortissement annuel ?",
      "choices": [
        "4 000 \u20AC",
        "5 000 \u20AC",
        "6 000 \u20AC"
      ],
      "correctIndex": 1,
      "explanation": "L'amortissement lin\xE9aire se calcule en divisant le co\xFBt par la dur\xE9e d'utilisation : 20 000 / 4 = 5 000 \u20AC.",
      "themeId": 12,
      "theme": "Bases comptables et financi\xE8res"
    },
    {
      "type": "C",
      "question": "Si une entreprise allonge le d\xE9lai de paiement accord\xE9 \xE0 ses clients, quel est l'effet sur son besoin en fonds de roulement (BFR) ?",
      "choices": [
        "Le BFR diminue",
        "Le BFR reste inchang\xE9",
        "Le BFR augmente"
      ],
      "correctIndex": 2,
      "explanation": "L'allongement du d\xE9lai client accro\xEEt les cr\xE9ances, donc le BFR augmente.",
      "themeId": 12,
      "theme": "Bases comptables et financi\xE8res"
    },
    {
      "type": "C",
      "question": "Un ratio de liquidit\xE9 g\xE9n\xE9rale inf\xE9rieur \xE0 1 indique que :",
      "choices": [
        "L'entreprise dispose d'un exc\xE9dent de tr\xE9sorerie",
        "L'actif \xE0 court terme ne couvre pas le passif \xE0 court terme",
        "L'entreprise est en situation de cessation de paiement"
      ],
      "correctIndex": 1,
      "explanation": "Un ratio inf\xE9rieur \xE0 1 signifie que les dettes \xE0 court terme exc\xE8dent les actifs \xE0 court terme.",
      "themeId": 12,
      "theme": "Bases comptables et financi\xE8res"
    },
    {
      "type": "C",
      "question": "Quel est l'effet d'une augmentation des amortissements sur le r\xE9sultat net d'une entreprise ?",
      "choices": [
        "Diminue le r\xE9sultat net",
        "Augmente le r\xE9sultat net",
        "N'a aucun effet"
      ],
      "correctIndex": 0,
      "explanation": "Les amortissements sont des charges qui r\xE9duisent le r\xE9sultat net.",
      "themeId": 12,
      "theme": "Bases comptables et financi\xE8res"
    },
    {
      "type": "C",
      "question": "Dans le bilan comptable, le fonds de roulement net global (FRNG) se calcule par :",
      "choices": [
        "Capitaux propres - Actif immobilis\xE9",
        "Actif circulant - Passif circulant",
        "Tr\xE9sorerie nette - Dettes financi\xE8res"
      ],
      "correctIndex": 1,
      "explanation": "Le FRNG est la diff\xE9rence entre l'actif circulant et le passif circulant.",
      "themeId": 12,
      "theme": "Bases comptables et financi\xE8res"
    },
    {
      "type": "C",
      "question": "Quelle est la cons\xE9quence d'une augmentation du besoin en fonds de roulement (BFR) sur la tr\xE9sorerie d'une entreprise ?",
      "choices": [
        "La tr\xE9sorerie augmente",
        "La tr\xE9sorerie reste inchang\xE9e",
        "La tr\xE9sorerie diminue"
      ],
      "correctIndex": 2,
      "explanation": "Une hausse du BFR n\xE9cessite un financement suppl\xE9mentaire, r\xE9duisant la tr\xE9sorerie.",
      "themeId": 12,
      "theme": "Bases comptables et financi\xE8res"
    },
    {
      "type": "A",
      "question": "Quelle autorit\xE9 d\xE9livre l'agr\xE9ment aux soci\xE9t\xE9s de gestion de portefeuille en France ?",
      "choices": [
        "L'AMF",
        "L'ACPR",
        "L'ESMA"
      ],
      "correctIndex": 0,
      "explanation": "L'AMF est l'autorit\xE9 comp\xE9tente pour agr\xE9er les soci\xE9t\xE9s de gestion en France.",
      "theme": "Cadre institutionnel et r\xE9glementaire",
      "themeId": 1
    },
    {
      "type": "A",
      "question": "Selon MiFID II, quelle est la dur\xE9e minimale de conservation des enregistrements des ordres et transactions par les prestataires de services d'investissement ?",
      "choices": [
        "3 ans",
        "5 ans",
        "10 ans"
      ],
      "correctIndex": 1,
      "explanation": "MiFID II impose une conservation d'au moins 5 ans pour ces enregistrements.",
      "theme": "Cadre institutionnel et r\xE9glementaire",
      "themeId": 1
    },
    {
      "type": "C",
      "question": "Quelle est la principale mission de l'ESMA en mati\xE8re de supervision ?",
      "choices": [
        "Coordonner la surveillance des agences de notation et des infrastructures de march\xE9",
        "Superviser directement les banques syst\xE9miques",
        "Fixer les taux d'int\xE9r\xEAt de la zone euro"
      ],
      "correctIndex": 0,
      "explanation": "L'ESMA coordonne la supervision des agences de notation et des infrastructures de march\xE9.",
      "theme": "Cadre institutionnel et r\xE9glementaire",
      "themeId": 1
    },
    {
      "type": "C",
      "question": "Un ordre de bourse '\xE0 la meilleure limite' est un ordre qui :",
      "choices": [
        "est ex\xE9cut\xE9 au prix du march\xE9 d\xE8s r\xE9ception",
        "est ex\xE9cut\xE9 au meilleur prix disponible dans le carnet d'ordres",
        "est ex\xE9cut\xE9 uniquement si le prix atteint une limite"
      ],
      "correctIndex": 1,
      "explanation": "Un ordre \xE0 la meilleure limite est ex\xE9cut\xE9 au meilleur prix disponible dans le carnet d'ordres.",
      "theme": "Cadre institutionnel et r\xE9glementaire",
      "themeId": 1
    },
    {
      "type": "A",
      "question": "Selon le r\xE8glement Prospectus, quelle est la dur\xE9e de validit\xE9 d'un prospectus approuv\xE9 par l'AMF ?",
      "choices": [
        "6 mois",
        "12 mois",
        "24 mois"
      ],
      "correctIndex": 1,
      "explanation": "Le prospectus est valable 12 mois apr\xE8s approbation, sous r\xE9serve de modifications.",
      "theme": "Cadre institutionnel et r\xE9glementaire",
      "themeId": 1
    },
    {
      "type": "A",
      "question": "Selon MiFID II, quelle est la dur\xE9e minimale de conservation des enregistrements t\xE9l\xE9phoniques par les entreprises d'investissement ?",
      "choices": [
        "3 ans",
        "7 ans",
        "5 ans"
      ],
      "correctIndex": 2,
      "explanation": "MiFID II impose une conservation de 5 ans, extensible \xE0 7 ans sur demande.",
      "theme": "Cadre institutionnel et r\xE9glementaire",
      "themeId": 1
    },
    {
      "type": "C",
      "question": "Quel est l'effet du passeport europ\xE9en pour un OPCVM agr\xE9\xE9 en France ?",
      "choices": [
        "Il permet sa commercialisation dans tous les \xC9tats membres sans agr\xE9ment local",
        "Il exige un agr\xE9ment dans chaque pays de commercialisation",
        "Il ne s'applique qu'aux fonds alternatifs"
      ],
      "correctIndex": 0,
      "explanation": "Le passeport europ\xE9en autorise la libre commercialisation des OPCVM dans l'UE apr\xE8s notification.",
      "theme": "Cadre institutionnel et r\xE9glementaire",
      "themeId": 1
    },
    {
      "type": "A",
      "question": "Quelle autorit\xE9 est charg\xE9e de la surveillance prudentielle des \xE9tablissements de cr\xE9dit en France ?",
      "choices": [
        "L'ACPR",
        "L'AMF",
        "L'ESMA"
      ],
      "correctIndex": 0,
      "explanation": "L'ACPR assure la surveillance prudentielle des banques et assurances.",
      "theme": "Cadre institutionnel et r\xE9glementaire",
      "themeId": 1
    },
    {
      "type": "A",
      "question": "Selon MiFID II, quelle obligation incombe aux entreprises d'investissement pour l'ex\xE9cution des ordres clients ?",
      "choices": [
        "Garantir le prix le plus bas",
        "Prendre toutes les mesures suffisantes pour obtenir le meilleur r\xE9sultat possible",
        "Ex\xE9cuter sur le march\xE9 principal"
      ],
      "correctIndex": 1,
      "explanation": "MiFID II impose une obligation de meilleure ex\xE9cution.",
      "theme": "Cadre institutionnel et r\xE9glementaire",
      "themeId": 1
    },
    {
      "type": "C",
      "question": "Que permet le passeport europ\xE9en pour une soci\xE9t\xE9 de gestion ?",
      "choices": [
        "G\xE9rer des fonds sans agr\xE9ment national",
        "\xC9viter toute obligation de d\xE9claration",
        "Commercialiser des fonds dans l'UE sans agr\xE9ment suppl\xE9mentaire"
      ],
      "correctIndex": 2,
      "explanation": "Le passeport permet de commercialiser des fonds dans l'UE sans nouvel agr\xE9ment.",
      "theme": "Cadre institutionnel et r\xE9glementaire",
      "themeId": 1
    },
    {
      "type": "A",
      "question": "Selon le r\xE8glement g\xE9n\xE9ral de l'AMF, quelle est la mission principale du responsable de la conformit\xE9 et du contr\xF4le interne (RCCI) ?",
      "choices": [
        "Veiller \xE0 la mise en \u0153uvre des proc\xE9dures de conformit\xE9 et informer la direction des manquements.",
        "Assurer la gestion des risques de cr\xE9dit de l'entreprise.",
        "Superviser les op\xE9rations de march\xE9 en temps r\xE9el."
      ],
      "correctIndex": 0,
      "explanation": "Le RCCI est charg\xE9 de la conformit\xE9 et du contr\xF4le interne, notamment le suivi des proc\xE9dures et le signalement des manquements.",
      "theme": "D\xE9ontologie et conformit\xE9",
      "themeId": 2
    },
    {
      "type": "A",
      "question": "En mati\xE8re de d\xE9ontologie, quelle est l'obligation d'un prestataire de services d'investissement concernant les op\xE9rations personnelles de ses collaborateurs ?",
      "choices": [
        "Il doit d\xE9clarer ces op\xE9rations \xE0 l'AMF dans un d\xE9lai de 5 jours ouvr\xE9s.",
        "Il doit mettre en place un registre des op\xE9rations personnelles et le conserver pendant 5 ans.",
        "Il doit interdire toute op\xE9ration personnelle sur les instruments financiers."
      ],
      "correctIndex": 1,
      "explanation": "Le prestataire doit tenir un registre des op\xE9rations personnelles et le conserver pendant 5 ans.",
      "theme": "D\xE9ontologie et conformit\xE9",
      "themeId": 2
    },
    {
      "type": "C",
      "question": "Dans le cadre de la lutte contre le blanchiment, quelle est la proc\xE9dure applicable pour une d\xE9claration de soup\xE7on \xE0 Tracfin ?",
      "choices": [
        "La d\xE9claration doit \xEAtre faite par \xE9crit dans un d\xE9lai de 48 heures.",
        "La d\xE9claration est facultative si le montant est inf\xE9rieur \xE0 10 000 euros.",
        "La d\xE9claration doit \xEAtre faite avant toute ex\xE9cution de l'op\xE9ration suspecte."
      ],
      "correctIndex": 2,
      "explanation": "La d\xE9claration de soup\xE7on doit \xEAtre faite avant l'ex\xE9cution de l'op\xE9ration suspecte.",
      "theme": "D\xE9ontologie et conformit\xE9",
      "themeId": 2
    },
    {
      "type": "C",
      "question": "Quelle est la sanction maximale que l'AMF peut prononcer \xE0 l'encontre d'une soci\xE9t\xE9 de gestion pour manquement \xE0 ses obligations de conformit\xE9 ?",
      "choices": [
        "Une amende de 100 millions d'euros ou 10% du chiffre d'affaires annuel.",
        "Une interdiction d'exercer pendant 10 ans.",
        "Une radiation de la liste des soci\xE9t\xE9s de gestion."
      ],
      "correctIndex": 0,
      "explanation": "L'AMF peut infliger une amende administrative de 100 millions d'euros maximum ou 10% du CA.",
      "theme": "D\xE9ontologie et conformit\xE9",
      "themeId": 2
    }
  ];
  return new Response(JSON.stringify({ questions }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
__name(onRequestGet, "onRequestGet");

// api/generate.js
async function onRequestPost(context) {
  const { env, request } = context;
  try {
    const payload = await request.json();
    const apiKey = env.LLM_API_KEY;
    const apiBase = env.OPENAI_API_BASE;
    const response = await fetch(`${apiBase}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-ai/DeepSeek-V4-Flash-0731",
        messages: payload.messages,
        temperature: payload.temperature || 0.1
      })
    });
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
}
__name(onRequestPost, "onRequestPost");
async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  });
}
__name(onRequestOptions, "onRequestOptions");

// ../.wrangler/tmp/pages-1SXfbd/functionsRoutes-0.5650506938742477.mjs
var routes = [
  {
    routePath: "/api/db",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet]
  },
  {
    routePath: "/api/generate",
    mountPath: "/api",
    method: "OPTIONS",
    middlewares: [],
    modules: [onRequestOptions]
  },
  {
    routePath: "/api/generate",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost]
  }
];

// ../../../../.hermes/node/lib/node_modules/wrangler/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../../../../.hermes/node/lib/node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
export {
  pages_template_worker_default as default
};
