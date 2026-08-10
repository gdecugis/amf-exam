export async function onRequestGet() {
  const questions = [
  {
    "type": "A",
    "question": "Quelle est la sanction maximale que peut prononcer la commission des sanctions de l'AMF à l'encontre d'une personne morale ?",
    "choices": [
      "10 millions d'euros",
      "100 millions d'euros",
      "1 milliard d'euros"
    ],
    "correctIndex": 1,
    "explanation": "La commission des sanctions peut infliger une amende maximale de 100 millions d'euros aux personnes morales.",
    "themeId": 1,
    "theme": "Cadre institutionnel et réglementaire"
  },
  {
    "type": "A",
    "question": "Quel est le délai de transmission à l'AMF du rapport annuel d'une société de gestion de portefeuille ?",
    "choices": [
      "4 mois",
      "8 mois",
      "6 mois"
    ],
    "correctIndex": 2,
    "explanation": "Les sociétés de gestion doivent transmettre leur rapport annuel à l'AMF dans les six mois suivant la clôture de l'exercice.",
    "themeId": 1,
    "theme": "Cadre institutionnel et réglementaire"
  },
  {
    "type": "A",
    "question": "Quel est l'effet d'une hausse des taux d'intérêt sur le prix des obligations à taux fixe ?",
    "choices": [
      "Diminution",
      "Augmentation",
      "Aucun effet"
    ],
    "correctIndex": 0,
    "explanation": "Une hausse des taux rend les obligations existantes moins attractives, entraînant une baisse de leur prix.",
    "themeId": 1,
    "theme": "Cadre institutionnel et réglementaire"
  },
  {
    "type": "A",
    "question": "Que se passe-t-il si le cours d'un titre dépasse le prix limite d'un ordre d'achat à cours limité ?",
    "choices": [
      "L'ordre est exécuté",
      "L'ordre reste en attente",
      "L'ordre est rejeté"
    ],
    "correctIndex": 1,
    "explanation": "Un ordre à cours limité d'achat n'est exécuté que si le cours est inférieur ou égal au prix limite ; sinon il reste en attente.",
    "themeId": 1,
    "theme": "Cadre institutionnel et réglementaire"
  },
  {
    "type": "A",
    "question": "Quelle autorité est compétente pour agréer les sociétés de gestion de portefeuille en France ?",
    "choices": [
      "AMF",
      "ACPR",
      "ESMA"
    ],
    "correctIndex": 0,
    "explanation": "L'AMF est l'autorité chargée de délivrer les agréments aux sociétés de gestion de portefeuille.",
    "themeId": 1,
    "theme": "Cadre institutionnel et réglementaire"
  },
  {
    "type": "A",
    "question": "Selon la directive MiFID, quelle est la durée minimale de conservation des enregistrements des ordres par les prestataires de services d'investissement ?",
    "choices": [
      "3 ans",
      "5 ans",
      "10 ans"
    ],
    "correctIndex": 1,
    "explanation": "La directive MiFID impose une conservation minimale de 5 ans pour les enregistrements des ordres.",
    "themeId": 1,
    "theme": "Cadre institutionnel et réglementaire"
  },
  {
    "type": "C",
    "question": "Un investisseur souhaite acheter 100 actions à un cours maximum de 50 euros. Quel type d'ordre doit-il passer pour garantir ce prix maximal ?",
    "choices": [
      "Ordre au marché",
      "Ordre à seuil de déclenchement",
      "Ordre à cours limité"
    ],
    "correctIndex": 2,
    "explanation": "L'ordre à cours limité garantit un prix maximal, contrairement aux autres types d'ordres.",
    "themeId": 1,
    "theme": "Cadre institutionnel et réglementaire"
  },
  {
    "type": "C",
    "question": "Quelle autorité est responsable de l'agrément et de la surveillance des sociétés de gestion de portefeuille en France ?",
    "choices": [
      "L'ACPR",
      "L'AMF",
      "L'ESMA"
    ],
    "correctIndex": 1,
    "explanation": "L'AMF est l'autorité compétente pour agréer et surveiller les sociétés de gestion en France.",
    "themeId": 1,
    "theme": "Cadre institutionnel et réglementaire"
  },
  {
    "type": "C",
    "question": "Quelle autorité européenne est chargée de la surveillance directe des agences de notation de crédit ?",
    "choices": [
      "ESMA",
      "EBA",
      "EIOPA"
    ],
    "correctIndex": 0,
    "explanation": "L'ESMA a la compétence exclusive de surveillance des agences de notation dans l'UE.",
    "themeId": 1,
    "theme": "Cadre institutionnel et réglementaire"
  },
  {
    "type": "C",
    "question": "Quel type d'ordre est exécuté immédiatement au meilleur prix disponible sur le marché ?",
    "choices": [
      "Ordre à cours limité",
      "Ordre à seuil de déclenchement",
      "Ordre au marché"
    ],
    "correctIndex": 2,
    "explanation": "Un ordre au marché est exécuté immédiatement au meilleur prix disponible.",
    "themeId": 1,
    "theme": "Cadre institutionnel et réglementaire"
  },
  {
    "type": "A",
    "question": "Quelle est l'obligation d'un conseiller en investissements financiers (CIF) concernant son enregistrement ?",
    "choices": [
      "Il doit être enregistré auprès de l'ORIAS",
      "Il doit être agréé par l'AMF",
      "Il doit être immatriculé au registre du commerce"
    ],
    "correctIndex": 0,
    "explanation": "Les CIF sont tenus de s'enregistrer auprès de l'ORIAS, pas d'obtenir un agrément AMF.",
    "themeId": 2,
    "theme": "Déontologie et conformité"
  },
  {
    "type": "A",
    "question": "Quelle est la durée minimale de conservation des enregistrements téléphoniques et communications électroniques par les entreprises d'investissement selon MIFID II ?",
    "choices": [
      "3 ans",
      "5 ans",
      "10 ans"
    ],
    "correctIndex": 1,
    "explanation": "MIFID II impose une conservation d'au moins 5 ans pour ces enregistrements.",
    "themeId": 2,
    "theme": "Déontologie et conformité"
  },
  {
    "type": "A",
    "question": "Quelle est la différence entre un manquement d'initié et un délit d'initié ?",
    "choices": [
      "Le manquement est une violation administrative, le délit une infraction pénale",
      "Le manquement concerne les personnes physiques, le délit les personnes morales",
      "Le manquement est puni d'une amende, le délit d'une peine de prison uniquement"
    ],
    "correctIndex": 0,
    "explanation": "Le manquement d'initié relève de la sanction administrative de l'AMF, le délit d'initié de la sanction pénale.",
    "themeId": 2,
    "theme": "Déontologie et conformité"
  },
  {
    "type": "A",
    "question": "En matière de conformité, que signifie le principe de proportionnalité dans la mise en œuvre des obligations réglementaires ?",
    "choices": [
      "Les obligations s'appliquent de manière identique à tous les acteurs",
      "Les obligations sont adaptées à la taille, à la nature et à la complexité de l'activité",
      "Les obligations sont réduites pour les acteurs les plus rentables"
    ],
    "correctIndex": 1,
    "explanation": "Le principe de proportionnalité permet d'ajuster les exigences selon les caractéristiques de l'entité.",
    "themeId": 2,
    "theme": "Déontologie et conformité"
  },
  {
    "type": "A",
    "question": "En matière de prévention des conflits d'intérêts, quelle est l'obligation d'une société de gestion ?",
    "choices": [
      "Refuser toute opération susceptible de créer un conflit d'intérêts.",
      "Mettre en place une politique de prévention et, si elle ne suffit pas, informer le client avant de traiter.",
      "Déclarer à l'AMF chaque conflit d'intérêts rencontré."
    ],
    "correctIndex": 1,
    "explanation": "La réglementation impose de prévenir les conflits, et à défaut, d'informer le client avant toute transaction.",
    "themeId": 2,
    "theme": "Déontologie et conformité"
  },
  {
    "type": "A",
    "question": "Quelle est la règle concernant les opérations personnelles des collaborateurs d'une société de gestion ?",
    "choices": [
      "Les collaborateurs ayant accès à des informations privilégiées doivent obtenir une autorisation préalable.",
      "Tous les collaborateurs doivent déclarer leurs opérations à l'AMF.",
      "Les opérations personnelles sont interdites pour tous les collaborateurs."
    ],
    "correctIndex": 0,
    "explanation": "Seuls les collaborateurs ayant accès à des informations privilégiées sont soumis à une autorisation préalable.",
    "themeId": 2,
    "theme": "Déontologie et conformité"
  },
  {
    "type": "C",
    "question": "En matière de conformité, que signifie le principe de proportionnalité ?",
    "choices": [
      "Les obligations sont identiques pour tous les acteurs.",
      "Les petites structures sont exonérées de toute obligation de conformité.",
      "Les obligations sont adaptées à la nature, à la taille et à la complexité de l'activité."
    ],
    "correctIndex": 2,
    "explanation": "Le principe de proportionnalité permet d'adapter les exigences réglementaires aux caractéristiques de l'acteur.",
    "themeId": 2,
    "theme": "Déontologie et conformité"
  },
  {
    "type": "C",
    "question": "Quelle obligation incombe à une société de gestion en matière de conformité ?",
    "choices": [
      "Mettre en place une fonction de conformité permanente, efficace et indépendante.",
      "Désigner un responsable de la conformité qui doit être membre du directoire.",
      "Externaliser obligatoirement la fonction de conformité à un prestataire agréé."
    ],
    "correctIndex": 0,
    "explanation": "La réglementation impose une fonction de conformité permanente, efficace et indépendante au sein de la société de gestion.",
    "themeId": 2,
    "theme": "Déontologie et conformité"
  },
  {
    "type": "C",
    "question": "Quel est le rôle de l'AMF en matière de déontologie et de conformité ?",
    "choices": [
      "Édicter les règles de déontologie pour les entreprises cotées.",
      "Contrôler le respect des obligations professionnelles des acteurs de marché.",
      "Sanctionner les manquements à la déontologie des journalistes financiers."
    ],
    "correctIndex": 1,
    "explanation": "L'AMF contrôle le respect des obligations professionnelles des acteurs de marché et peut sanctionner les manquements.",
    "themeId": 2,
    "theme": "Déontologie et conformité"
  },
  {
    "type": "C",
    "question": "Dans le cadre de la lutte contre le blanchiment, que signifie l'approche par les risques ?",
    "choices": [
      "Appliquer les mêmes mesures de vigilance à tous les clients sans distinction.",
      "Se concentrer uniquement sur les transactions supérieures à un seuil fixé.",
      "Adapter les mesures de vigilance en fonction du niveau de risque présenté par le client."
    ],
    "correctIndex": 2,
    "explanation": "L'approche par les risques consiste à moduler les mesures de vigilance selon le niveau de risque du client.",
    "themeId": 2,
    "theme": "Déontologie et conformité"
  },
  {
    "type": "A",
    "question": "En matière de lutte contre le blanchiment, à quelle autorité une société de gestion doit-elle déclarer les opérations suspectes ?",
    "choices": [
      "À l'AMF",
      "À Tracfin",
      "À l'ACPR"
    ],
    "correctIndex": 1,
    "explanation": "Les sociétés de gestion déclarent les opérations suspectes à Tracfin, cellule de renseignement financier.",
    "themeId": 3,
    "theme": "Sécurité financière (LCB-FT, embargos)"
  },
  {
    "type": "A",
    "question": "Quelle est la durée légale de conservation des documents relatifs à la LCB-FT pour les professionnels assujettis ?",
    "choices": [
      "5 ans",
      "10 ans",
      "3 ans"
    ],
    "correctIndex": 0,
    "explanation": "Les documents doivent être conservés 5 ans après la fin de la relation d'affaires ou l'opération.",
    "themeId": 3,
    "theme": "Sécurité financière (LCB-FT, embargos)"
  },
  {
    "type": "A",
    "question": "Dans le cadre d'un embargo, que signifie le gel des avoirs ?",
    "choices": [
      "Interdiction de tout échange commercial avec le pays visé",
      "Saisie définitive des biens des personnes désignées",
      "Blocage des fonds et ressources économiques des personnes désignées"
    ],
    "correctIndex": 2,
    "explanation": "Le gel des avoirs bloque les fonds sans transfert de propriété, contrairement à une saisie.",
    "themeId": 3,
    "theme": "Sécurité financière (LCB-FT, embargos)"
  },
  {
    "type": "A",
    "question": "Quelle est la conduite à tenir pour un virement vers un pays soumis à un embargo ?",
    "choices": [
      "Exécuter si le montant est inférieur à 10 000 euros",
      "Refuser et signaler l'opération",
      "Exécuter après vérification de l'identité du bénéficiaire"
    ],
    "correctIndex": 1,
    "explanation": "Toute opération vers un pays sous embargo doit être refusée et signalée aux autorités compétentes.",
    "themeId": 3,
    "theme": "Sécurité financière (LCB-FT, embargos)"
  },
  {
    "type": "A",
    "question": "Selon la réglementation LCB-FT, quelle est l'obligation d'une entreprise d'assurance pour une opération occasionnelle ?",
    "choices": [
      "Déclarer systématiquement toute opération à Tracfin",
      "Identifier le client et le bénéficiaire effectif au-delà d'un seuil de 1 000 €",
      "Conserver les documents pendant 5 ans"
    ],
    "correctIndex": 1,
    "explanation": "L'identification est obligatoire pour les opérations occasionnelles à partir de 1 000 €.",
    "themeId": 3,
    "theme": "Sécurité financière (LCB-FT, embargos)"
  },
  {
    "type": "C",
    "question": "Quelle autorité est chargée de la mise en œuvre des sanctions financières internationales (embargos) en France ?",
    "choices": [
      "La Direction générale du Trésor (DG Trésor)",
      "L'Autorité de contrôle prudentiel et de résolution (ACPR)",
      "La cellule de renseignement financier Tracfin"
    ],
    "correctIndex": 0,
    "explanation": "La DG Trésor est l'autorité compétente pour appliquer les sanctions financières.",
    "themeId": 3,
    "theme": "Sécurité financière (LCB-FT, embargos)"
  },
  {
    "type": "C",
    "question": "Quelle est la principale différence entre un embargo et une mesure de gel des avoirs ?",
    "choices": [
      "L'embargo est décidé par l'UE, le gel des avoirs par la France",
      "Le gel des avoirs est une mesure préventive, l'embargo une mesure répressive",
      "L'embargo concerne des biens ou secteurs, le gel des avoirs vise des personnes ou entités"
    ],
    "correctIndex": 2,
    "explanation": "L'embargo cible des biens ou secteurs, le gel des avoirs cible des personnes ou entités.",
    "themeId": 3,
    "theme": "Sécurité financière (LCB-FT, embargos)"
  },
  {
    "type": "C",
    "question": "À quelle autorité une société de gestion doit-elle déclarer une opération suspecte dans le cadre de la LCB-FT ?",
    "choices": [
      "Le procureur de la République",
      "Tracfin",
      "L'AMF"
    ],
    "correctIndex": 1,
    "explanation": "Les professionnels assujettis doivent déclarer toute opération suspecte à Tracfin, la cellule de renseignement financier.",
    "themeId": 3,
    "theme": "Sécurité financière (LCB-FT, embargos)"
  },
  {
    "type": "C",
    "question": "Quel seuil de détention du capital ou des droits de vote caractérise un bénéficiaire effectif au sens de la LCB-FT ?",
    "choices": [
      "10 %",
      "25 %",
      "50 %"
    ],
    "correctIndex": 1,
    "explanation": "Le bénéficiaire effectif est toute personne détenant plus de 25 % du capital ou des droits de vote.",
    "themeId": 3,
    "theme": "Sécurité financière (LCB-FT, embargos)"
  },
  {
    "type": "C",
    "question": "Quel est l'effet d'une mesure de gel des avoirs édictée dans le cadre d'un embargo sur les fonds d'une personne désignée ?",
    "choices": [
      "Ils sont transférés sous séquestre judiciaire",
      "Ils sont confisqués au profit de l'État",
      "Ils sont bloqués et ne peuvent faire l'objet d'aucune transaction"
    ],
    "correctIndex": 2,
    "explanation": "Le gel des avoirs interdit tout mouvement de fonds sans transfert de propriété.",
    "themeId": 3,
    "theme": "Sécurité financière (LCB-FT, embargos)"
  },
  {
    "type": "A",
    "question": "Selon le règlement MAR, quelle est la durée maximale de report de la publication d'une information privilégiée par un émetteur ?",
    "choices": [
      "Aucune durée maximale, mais l'émetteur doit en informer l'autorité compétente",
      "2 jours ouvrés maximum, sans condition",
      "10 jours de bourse maximum, sous réserve de l'accord de l'AMF"
    ],
    "correctIndex": 0,
    "explanation": "Le report est possible sans durée fixe si les conditions de confidentialité sont remplies et l'autorité informée.",
    "themeId": 4,
    "theme": "Réglementation abus de marché"
  },
  {
    "type": "A",
    "question": "Quelle est la procédure de déclaration des transactions des dirigeants (PDMR) selon MAR ?",
    "choices": [
      "Ils doivent déclarer à l'émetteur uniquement dans les 10 jours ouvrés",
      "Ils doivent déclarer à l'émetteur et à l'AMF dans les 3 jours ouvrés",
      "Ils doivent déclarer à l'AMF dans les 5 jours ouvrés, sans informer l'émetteur"
    ],
    "correctIndex": 1,
    "explanation": "Le PDMR notifie à l'émetteur et à l'autorité compétente dans un délai de 3 jours ouvrés après la transaction.",
    "themeId": 4,
    "theme": "Réglementation abus de marché"
  },
  {
    "type": "A",
    "question": "Quelle pratique constitue une manipulation de marché par 'spoofing' ?",
    "choices": [
      "Exécuter des ordres pour le compte de clients en respectant les règles",
      "Publier des recherches sur une société sans conflit d'intérêts",
      "Passer des ordres sans intention de les exécuter pour donner une fausse indication de la demande"
    ],
    "correctIndex": 2,
    "explanation": "Le spoofing consiste à afficher des ordres non sincères pour tromper les autres participants sur le carnet d'ordres.",
    "themeId": 4,
    "theme": "Réglementation abus de marché"
  },
  {
    "type": "A",
    "question": "Qu'est-ce qu'une manipulation de marché par diffusion d'informations fausses ou trompeuses ?",
    "choices": [
      "Donner des informations exactes mais tardives",
      "Diffuser des informations inexactes pour influencer le cours d'un instrument financier",
      "Publier des informations réglementées conformément à la réglementation"
    ],
    "correctIndex": 1,
    "explanation": "La diffusion d'informations inexactes ou trompeuses qui induit le marché en erreur constitue une manipulation de marché.",
    "themeId": 4,
    "theme": "Réglementation abus de marché"
  },
  {
    "type": "A",
    "question": "Selon le règlement MAR, un émetteur doit diffuser une information privilégiée au public :",
    "choices": [
      "dès que possible",
      "après validation par l'AMF",
      "dans un délai de 24 heures"
    ],
    "correctIndex": 0,
    "explanation": "L'article 17 du règlement MAR impose une diffusion immédiate de l'information privilégiée.",
    "themeId": 4,
    "theme": "Réglementation abus de marché"
  },
  {
    "type": "C",
    "question": "Quelle pratique est considérée comme une manipulation de marché au sens du règlement MAR ?",
    "choices": [
      "Utiliser une information privilégiée pour acheter des titres",
      "Passer des ordres sans intention de les exécuter",
      "Publier des états financiers annuels"
    ],
    "correctIndex": 1,
    "explanation": "Le spoofing, ordres sans intention d'exécution, est une manipulation de marché interdite.",
    "themeId": 4,
    "theme": "Réglementation abus de marché"
  },
  {
    "type": "C",
    "question": "Quelle pratique de manipulation de marché consiste à passer des ordres d'achat et de vente sur le même instrument pour créer une activité artificielle ?",
    "choices": [
      "Spoofing",
      "Pump and dump",
      "Wash trading"
    ],
    "correctIndex": 2,
    "explanation": "Le wash trading simule des transactions pour donner une fausse impression de liquidité.",
    "themeId": 4,
    "theme": "Réglementation abus de marché"
  },
  {
    "type": "C",
    "question": "Quel est le délai maximal pour qu'une personne exerçant des responsabilités dirigeantes notifie ses transactions à l'autorité compétente ?",
    "choices": [
      "1 jour ouvrable",
      "3 jours ouvrables",
      "5 jours ouvrables"
    ],
    "correctIndex": 1,
    "explanation": "Selon le règlement MAR, la notification doit intervenir dans les trois jours ouvrables suivant la transaction.",
    "themeId": 4,
    "theme": "Réglementation abus de marché"
  },
  {
    "type": "C",
    "question": "Selon le règlement MAR, quelle condition doit remplir une information pour être considérée comme privilégiée ?",
    "choices": [
      "Être précise, non publique et susceptible d'influencer le cours",
      "Être publique et susceptible d'influencer le cours",
      "Être précise et publique"
    ],
    "correctIndex": 0,
    "explanation": "Une information privilégiée doit être précise, non rendue publique et susceptible d'influencer le cours des instruments financiers.",
    "themeId": 4,
    "theme": "Réglementation abus de marché"
  },
  {
    "type": "C",
    "question": "Qu'est-ce qu'une opération de wash trade dans le cadre des manipulations de marché ?",
    "choices": [
      "Achat et vente simultanés d'un même instrument par le même intervenant",
      "Achat d'un instrument pour influencer le cours",
      "Vente d'un instrument sans détention préalable"
    ],
    "correctIndex": 0,
    "explanation": "Le wash trade consiste à acheter et vendre le même instrument simultanément pour créer une fausse apparence de liquidité.",
    "themeId": 4,
    "theme": "Réglementation abus de marché"
  },
  {
    "type": "A",
    "question": "Pour évaluer l'adéquation d'un instrument financier à un client, un prestataire de services d'investissement doit recueillir des informations sur :",
    "choices": [
      "les connaissances, l'expérience, la situation financière et les objectifs d'investissement du client.",
      "uniquement les connaissances et l'expérience du client.",
      "uniquement la situation financière et les objectifs d'investissement."
    ],
    "correctIndex": 0,
    "explanation": "L'adéquation requiert une évaluation complète du profil du client, incluant tous ces éléments.",
    "themeId": 5,
    "theme": "Commercialisation d'instruments financiers"
  },
  {
    "type": "A",
    "question": "En matière de commercialisation de produits d'épargne, quel document doit être remis à un client non professionnel avant la souscription d'un produit d'investissement packagé (PRIIP) ?",
    "choices": [
      "Le prospectus complet approuvé par l'Autorité des marchés financiers.",
      "Le document d'informations clés (DIC) qui présente les caractéristiques essentielles et les risques du produit.",
      "Un rapport annuel de gestion du produit."
    ],
    "correctIndex": 1,
    "explanation": "Le DIC est obligatoire pour les PRIIPs, remis avant la souscription.",
    "themeId": 5,
    "theme": "Commercialisation d'instruments financiers"
  },
  {
    "type": "A",
    "question": "Un ordre à cours limité d'achat de 100 actions à 50 euros est placé. Le cours de l'action est actuellement de 52 euros. Que se passe-t-il ?",
    "choices": [
      "L'ordre est exécuté immédiatement au cours de 52 euros.",
      "L'ordre reste en attente jusqu'à ce que le cours atteigne 50 euros ou moins.",
      "L'ordre est annulé automatiquement."
    ],
    "correctIndex": 1,
    "explanation": "Un ordre à cours limité n'est exécuté qu'au prix limite ou meilleur.",
    "themeId": 5,
    "theme": "Commercialisation d'instruments financiers"
  },
  {
    "type": "A",
    "question": "Pour un client de détail, quel critère est prépondérant dans l'obligation de meilleure exécution ?",
    "choices": [
      "Le coût total de la transaction.",
      "La rapidité d'exécution.",
      "La probabilité d'exécution."
    ],
    "correctIndex": 0,
    "explanation": "Pour les clients de détail, le coût total est le critère le plus important.",
    "themeId": 5,
    "theme": "Commercialisation d'instruments financiers"
  },
  {
    "type": "A",
    "question": "Dans le cadre de la commercialisation d'instruments financiers, quelle est l'obligation principale d'un conseiller en investissements financiers (CIF) ?",
    "choices": [
      "Vérifier l'adéquation de l'instrument au profil de l'investisseur",
      "Garantir la performance de l'instrument",
      "Transmettre systématiquement les ordres au marché"
    ],
    "correctIndex": 0,
    "explanation": "Le CIF doit effectuer une évaluation de l'adéquation (suitability) avant toute recommandation.",
    "themeId": 5,
    "theme": "Commercialisation d'instruments financiers"
  },
  {
    "type": "A",
    "question": "Lors de la commercialisation d'un OPCVM, quel document doit être remis à l'investisseur avant la souscription ?",
    "choices": [
      "Le prospectus complet",
      "Le document d'information clé pour l'investisseur (DICI)",
      "Le rapport annuel de gestion"
    ],
    "correctIndex": 1,
    "explanation": "Le DICI est obligatoire avant souscription, le prospectus est disponible mais pas systématiquement remis.",
    "themeId": 5,
    "theme": "Commercialisation d'instruments financiers"
  },
  {
    "type": "C",
    "question": "Un ordre d'achat à cours limité est exécuté uniquement si le prix du marché est :",
    "choices": [
      "supérieur ou égal au prix limite",
      "strictement supérieur au prix limite",
      "inférieur ou égal au prix limite"
    ],
    "correctIndex": 2,
    "explanation": "Pour un achat, l'exécution n'a lieu que si le prix est au plus égal au prix limite.",
    "themeId": 5,
    "theme": "Commercialisation d'instruments financiers"
  },
  {
    "type": "C",
    "question": "Selon MIFID II, quelle est l'obligation principale d'un distributeur dans le cadre de la gouvernance produit ?",
    "choices": [
      "Ne distribuer que des produits à faible risque.",
      "Définir un marché cible et s'assurer que le produit est distribué en cohérence avec celui-ci.",
      "S'assurer que le produit est rentable pour le distributeur."
    ],
    "correctIndex": 1,
    "explanation": "La gouvernance produit impose de définir un marché cible et de vérifier la cohérence de la distribution.",
    "themeId": 5,
    "theme": "Commercialisation d'instruments financiers"
  },
  {
    "type": "C",
    "question": "Quelle est la règle concernant les rétrocessions (inducements) dans le cadre de la commercialisation de fonds ?",
    "choices": [
      "Elles sont interdites sauf si elles améliorent la qualité du service et sont divulguées.",
      "Elles sont autorisées sans condition.",
      "Elles sont interdites pour tous les clients."
    ],
    "correctIndex": 0,
    "explanation": "Les rétrocessions sont permises si elles améliorent la qualité et sont transparentes.",
    "themeId": 5,
    "theme": "Commercialisation d'instruments financiers"
  },
  {
    "type": "C",
    "question": "Quelle est la principale différence entre le test d'adéquation (suitability) et le test d'appropriation (appropriateness) ?",
    "choices": [
      "Le test d'appropriation est plus complet que le test d'adéquation.",
      "Les deux tests sont obligatoires pour le service d'exécution seule.",
      "Le test d'adéquation évalue la situation financière et les objectifs, tandis que l'appropriation ne vérifie que connaissances et expérience."
    ],
    "correctIndex": 2,
    "explanation": "Le test d'adéquation est plus complet, incluant situation financière et objectifs.",
    "themeId": 5,
    "theme": "Commercialisation d'instruments financiers"
  },
  {
    "type": "A",
    "question": "Quelle est l'obligation d'une entreprise d'investissement en matière de gestion des conflits d'intérêts ?",
    "choices": [
      "Elle doit les identifier et les prévenir, et informer le client si elle ne peut les éviter.",
      "Elle doit les ignorer si le client est professionnel.",
      "Elle doit les déclarer à l'AMF avant toute transaction."
    ],
    "correctIndex": 0,
    "explanation": "L'entreprise doit prévenir les conflits et informer le client si elle ne peut les éviter.",
    "themeId": 6,
    "theme": "Relations avec les clients"
  },
  {
    "type": "A",
    "question": "Quel est l'effet d'un ordre à cours limité par rapport à un ordre au marché ?",
    "choices": [
      "Il garantit l'exécution au prix indiqué ou meilleur.",
      "Il ne garantit pas l'exécution si le prix n'est pas atteint.",
      "Il est exécuté immédiatement au meilleur prix disponible."
    ],
    "correctIndex": 1,
    "explanation": "Un ordre à cours limité ne garantit pas l'exécution si le prix n'est pas atteint.",
    "themeId": 6,
    "theme": "Relations avec les clients"
  },
  {
    "type": "A",
    "question": "Selon la réglementation, quelle est l'obligation d'une entreprise d'investissement concernant l'évaluation de l'adéquation d'un service de conseil en investissement ?",
    "choices": [
      "Elle doit s'assurer que le client a les moyens financiers suffisants.",
      "Elle doit fournir un rapport annuel sur les performances.",
      "Elle doit recueillir des informations sur les connaissances et l'expérience du client en matière d'investissement."
    ],
    "correctIndex": 2,
    "explanation": "L'évaluation d'adéquation exige de connaître les connaissances et l'expérience du client.",
    "themeId": 6,
    "theme": "Relations avec les clients"
  },
  {
    "type": "A",
    "question": "Quelle est la conséquence d'un ordre 'tout ou rien' ?",
    "choices": [
      "Il doit être exécuté en totalité ou pas du tout.",
      "Il peut être exécuté partiellement.",
      "Il est exécuté au prix du marché."
    ],
    "correctIndex": 0,
    "explanation": "Un ordre tout ou rien ne peut être exécuté que si la totalité de la quantité est disponible.",
    "themeId": 6,
    "theme": "Relations avec les clients"
  },
  {
    "type": "A",
    "question": "Lors de la réception d'un ordre de bourse, quelle obligation incombe à l'entreprise d'investissement ?",
    "choices": [
      "Enregistrer l'ordre immédiatement et le transmettre sans délai",
      "Ne transmettre l'ordre qu'après confirmation écrite du client",
      "Transmettre l'ordre uniquement si le client a un compte espèces approvisionné"
    ],
    "correctIndex": 0,
    "explanation": "Les ordres doivent être enregistrés et transmis sans délai pour garantir la meilleure exécution.",
    "themeId": 6,
    "theme": "Relations avec les clients"
  },
  {
    "type": "C",
    "question": "Quelle information doit obligatoirement figurer dans le relevé de compte périodique envoyé au client ?",
    "choices": [
      "La valorisation des instruments financiers au prix de revient",
      "Le détail des frais et commissions prélevés sur la période",
      "La liste des ordres passés par le client sur les cinq dernières années"
    ],
    "correctIndex": 1,
    "explanation": "Le relevé doit mentionner les frais et commissions pour assurer la transparence des coûts.",
    "themeId": 6,
    "theme": "Relations avec les clients"
  },
  {
    "type": "C",
    "question": "Un client donne un ordre à cours limité d'achat à 50 €, alors que le cours est de 52 €. Que se passe-t-il ?",
    "choices": [
      "L'ordre est exécuté immédiatement au cours de 52 €",
      "L'ordre est enregistré et ne sera exécuté que si le cours atteint 50 € ou moins",
      "L'ordre est rejeté car le prix limite est inférieur au cours actuel"
    ],
    "correctIndex": 1,
    "explanation": "Un ordre à cours limité n'est exécuté qu'au prix limite ou meilleur, donc il attend une baisse du cours.",
    "themeId": 6,
    "theme": "Relations avec les clients"
  },
  {
    "type": "C",
    "question": "Dans le cadre de la gestion de portefeuille, quelle obligation incombe à la société de gestion envers son client ?",
    "choices": [
      "Recueillir des informations sur la situation financière, les objectifs et la tolérance au risque",
      "Se contenter d'une déclaration du client sans vérification",
      "Ne pas demander d'informations si le client est professionnel"
    ],
    "correctIndex": 0,
    "explanation": "La société de gestion doit évaluer l'adéquation en recueillant ces informations.",
    "themeId": 6,
    "theme": "Relations avec les clients"
  },
  {
    "type": "C",
    "question": "Quelle est la caractéristique d'un ordre à cours limité ?",
    "choices": [
      "Il garantit l'exécution immédiate au prix du marché",
      "Il est exécuté au prix indiqué ou à un prix plus favorable",
      "Il est exécuté uniquement si le prix atteint le niveau indiqué"
    ],
    "correctIndex": 1,
    "explanation": "Un ordre à cours limité est exécuté au prix indiqué ou à un prix plus favorable, sans garantie d'exécution.",
    "themeId": 6,
    "theme": "Relations avec les clients"
  },
  {
    "type": "C",
    "question": "Que signifie l'obligation de 'meilleure exécution' pour un prestataire de services d'investissement ?",
    "choices": [
      "Exécuter les ordres dans l'ordre chronologique de réception",
      "Négocier uniquement sur les marchés réglementés",
      "Obtenir le meilleur résultat possible en considérant prix, coûts, rapidité et probabilité"
    ],
    "correctIndex": 2,
    "explanation": "La meilleure exécution exige de prendre en compte plusieurs critères pour obtenir le meilleur résultat pour le client.",
    "themeId": 6,
    "theme": "Relations avec les clients"
  },
  {
    "type": "C",
    "question": "Quelle caractéristique distingue un security token d'un utility token ?",
    "choices": [
      "Le security token confère des droits financiers ou de gouvernance sur un actif sous-jacent",
      "Le utility token est toujours émis par une autorité publique",
      "Le security token ne peut être échangé que sur des plateformes régulées"
    ],
    "correctIndex": 0,
    "explanation": "Un security token représente un investissement et donne des droits économiques, contrairement à un utility token qui donne accès à un service.",
    "themeId": 7,
    "theme": "Instruments financiers et crypto-actifs"
  },
  {
    "type": "C",
    "question": "Quel est le principal risque d'un stablecoin adossé à des réserves de monnaie fiduciaire ?",
    "choices": [
      "La volatilité de la crypto-monnaie sous-jacente",
      "La défaillance du dépositaire ou la non-vérification des réserves",
      "L'absence de réglementation sur les échanges"
    ],
    "correctIndex": 1,
    "explanation": "Le risque réside dans la confiance en la détention effective des réserves, car une couverture insuffisante peut entraîner une perte de parité.",
    "themeId": 7,
    "theme": "Instruments financiers et crypto-actifs"
  },
  {
    "type": "C",
    "question": "Dans le cadre de la tokenisation d'un actif immobilier, que représente le jeton émis ?",
    "choices": [
      "Une unité de compte virtuelle sans valeur légale",
      "Une fraction de propriété de l'actif sous-jacent",
      "Un simple moyen de paiement pour l'achat de l'actif"
    ],
    "correctIndex": 1,
    "explanation": "La tokenisation fractionne la propriété d'un actif réel en jetons, chacun représentant une part de cet actif.",
    "themeId": 7,
    "theme": "Instruments financiers et crypto-actifs"
  },
  {
    "type": "C",
    "question": "Quelle est la conséquence directe de la forte volatilité des crypto-actifs sur leur utilisation comme monnaie ?",
    "choices": [
      "Ils deviennent plus attractifs pour les transactions quotidiennes",
      "Leur valeur de référence instable rend difficile leur fonction d'unité de compte",
      "Ils sont automatiquement indexés sur l'inflation"
    ],
    "correctIndex": 1,
    "explanation": "Une monnaie doit être stable pour servir de mesure de valeur ; la volatilité compromet cette fonction.",
    "themeId": 7,
    "theme": "Instruments financiers et crypto-actifs"
  },
  {
    "type": "C",
    "question": "Comment calcule-t-on la capitalisation boursière d'un crypto-actif ?",
    "choices": [
      "Prix × offre en circulation",
      "Prix × offre totale",
      "Prix × volume échangé"
    ],
    "correctIndex": 0,
    "explanation": "La capitalisation boursière est le produit du prix par l'offre en circulation.",
    "themeId": 7,
    "theme": "Instruments financiers et crypto-actifs"
  },
  {
    "type": "C",
    "question": "Quelle est la principale distinction entre un security token et un utility token ?",
    "choices": [
      "Le security token est soumis à MiCA, l'utility token en est exempt",
      "Le security token confère des droits financiers, l'utility token donne accès à un service",
      "Le security token est émis sur une blockchain privée, l'utility token sur une blockchain publique"
    ],
    "correctIndex": 1,
    "explanation": "Un security token représente un investissement, tandis qu'un utility token donne accès à un produit ou service.",
    "themeId": 7,
    "theme": "Instruments financiers et crypto-actifs"
  },
  {
    "type": "C",
    "question": "Quelle est la différence fondamentale entre une 'coin' et un 'token' dans l'écosystème crypto ?",
    "choices": [
      "Une coin est fongible, un token est non fongible",
      "Une coin est une monnaie légale, un token est une monnaie privée",
      "Une coin possède sa propre blockchain, un token utilise une blockchain existante"
    ],
    "correctIndex": 2,
    "explanation": "Les coins ont leur propre blockchain, les tokens sont émis sur des blockchains existantes.",
    "themeId": 7,
    "theme": "Instruments financiers et crypto-actifs"
  },
  {
    "type": "C",
    "question": "Dans un DEX, quel mécanisme détermine le prix d'un actif dans un pool de liquidité ?",
    "choices": [
      "La formule du produit constant (x*y=k)",
      "Le carnet d'ordres centralisé de l'exchange",
      "Le prix moyen pondéré des transactions passées"
    ],
    "correctIndex": 0,
    "explanation": "La formule x*y=k maintient l'équilibre des réserves et détermine le prix.",
    "themeId": 7,
    "theme": "Instruments financiers et crypto-actifs"
  },
  {
    "type": "C",
    "question": "Quelle est la principale caractéristique d'un jeton utilitaire (utility token) ?",
    "choices": [
      "Il confère des droits de propriété sur l'entreprise",
      "Il donne accès à un service ou une fonctionnalité",
      "Il est adossé à une monnaie fiduciaire"
    ],
    "correctIndex": 1,
    "explanation": "Un utility token est conçu pour donner accès à un produit ou service.",
    "themeId": 7,
    "theme": "Instruments financiers et crypto-actifs"
  },
  {
    "type": "C",
    "question": "Quel est le rôle d'un oracle dans un smart contract ?",
    "choices": [
      "Il exécute automatiquement les transactions",
      "Il sécurise le portefeuille de l'utilisateur",
      "Il fournit des données externes au contrat"
    ],
    "correctIndex": 2,
    "explanation": "Un oracle relie la blockchain aux données du monde réel.",
    "themeId": 7,
    "theme": "Instruments financiers et crypto-actifs"
  },
  {
    "type": "C",
    "question": "Quel est le principe fondamental de la séparation des actifs dans un compte de tiers ?",
    "choices": [
      "Les actifs sont confondus avec ceux de la société de gestion.",
      "Les actifs sont conservés par un dépositaire distinct.",
      "Les actifs sont gérés par le dépositaire."
    ],
    "correctIndex": 1,
    "explanation": "La séparation des actifs impose un dépositaire distinct pour protéger les investisseurs.",
    "themeId": 8,
    "theme": "Gestion collective / compte de tiers"
  },
  {
    "type": "C",
    "question": "Dans un FCP, qui est responsable de la valorisation des actifs ?",
    "choices": [
      "La société de gestion.",
      "Le dépositaire.",
      "L'auditeur."
    ],
    "correctIndex": 0,
    "explanation": "La société de gestion est responsable de la valorisation, sous contrôle du dépositaire.",
    "themeId": 8,
    "theme": "Gestion collective / compte de tiers"
  },
  {
    "type": "C",
    "question": "Quelle est la conséquence d'un ordre de souscription reçu après l'heure limite de centralisation ?",
    "choices": [
      "Il est exécuté au prix du jour même.",
      "Il est annulé.",
      "Il est exécuté au prix du jour suivant."
    ],
    "correctIndex": 2,
    "explanation": "Les ordres reçus après l'heure limite sont traités sur la valeur liquidative suivante.",
    "themeId": 8,
    "theme": "Gestion collective / compte de tiers"
  },
  {
    "type": "C",
    "question": "Quel est le rôle principal d'un dépositaire dans la gestion collective ?",
    "choices": [
      "Gérer les investissements du fonds.",
      "Conserver les actifs et contrôler la régularité des décisions.",
      "Fixer la valeur liquidative."
    ],
    "correctIndex": 1,
    "explanation": "Le dépositaire conserve les actifs et veille à la conformité des décisions de gestion.",
    "themeId": 8,
    "theme": "Gestion collective / compte de tiers"
  },
  {
    "type": "C",
    "question": "Dans un OPCVM indiciel, quel est l'impact d'une frais de gestion élevée sur la performance nette par rapport à l'indice de référence ?",
    "choices": [
      "Elle améliore la performance nette si l'indice monte",
      "Elle réduit la performance nette, même si l'indice est stable",
      "Elle n'a aucun impact si l'indice est volatil"
    ],
    "correctIndex": 1,
    "explanation": "Les frais de gestion sont prélevés en permanence, réduisant la performance nette quel que soit le mouvement de l'indice.",
    "themeId": 8,
    "theme": "Gestion collective / compte de tiers"
  },
  {
    "type": "C",
    "question": "Un compte de tiers géré par un dépositaire central (par exemple Euroclear) est utilisé principalement pour :",
    "choices": [
      "Détenir des titres pour le compte d'autres dépositaires ou teneurs de compte",
      "Enregistrer les transactions des investisseurs particuliers",
      "Gérer les ordres de bourse des sociétés de gestion"
    ],
    "correctIndex": 0,
    "explanation": "Le compte de tiers permet au dépositaire central de détenir des titres pour le compte d'intermédiaires financiers.",
    "themeId": 8,
    "theme": "Gestion collective / compte de tiers"
  },
  {
    "type": "C",
    "question": "Dans une SICAV, la valeur liquidative (VL) est calculée en divisant l'actif net par le nombre de parts. Que se passe-t-il si des souscriptions importantes arrivent après le calcul de la VL ?",
    "choices": [
      "Les nouvelles souscriptions sont traitées à la VL du jour suivant",
      "Les nouvelles souscriptions sont traitées à la VL du jour même",
      "Les souscriptions sont suspendues jusqu'à la prochaine VL"
    ],
    "correctIndex": 0,
    "explanation": "Les ordres reçus après la centralisation sont exécutés à la prochaine VL, conformément au principe de l'exécution à cours inconnu.",
    "themeId": 8,
    "theme": "Gestion collective / compte de tiers"
  },
  {
    "type": "C",
    "question": "Dans la gestion collective, quel est le rôle principal du compte de tiers ?",
    "choices": [
      "Isoler les actifs des investisseurs de ceux de la société de gestion",
      "Permettre des opérations de prêt de titres aux investisseurs",
      "Garantir un rendement minimal aux porteurs de parts"
    ],
    "correctIndex": 0,
    "explanation": "Le compte de tiers assure la ségrégation des actifs, protégeant les investisseurs en cas de faillite de la société de gestion.",
    "themeId": 8,
    "theme": "Gestion collective / compte de tiers"
  },
  {
    "type": "C",
    "question": "Quelle est une obligation du dépositaire d'un OPCVM ?",
    "choices": [
      "Fixer la valeur liquidative chaque jour",
      "Assurer la conservation des actifs et le contrôle de la régularité des décisions",
      "Commercialiser les parts auprès des investisseurs"
    ],
    "correctIndex": 1,
    "explanation": "Le dépositaire a une double mission de conservation et de contrôle, distincte de la gestion et de la commercialisation.",
    "themeId": 8,
    "theme": "Gestion collective / compte de tiers"
  },
  {
    "type": "C",
    "question": "Quelle est la limite maximale de détention d'un même émetteur pour un OPCVM de droit français ?",
    "choices": [
      "5% de l'actif",
      "10% de l'actif",
      "20% de l'actif"
    ],
    "correctIndex": 2,
    "explanation": "La réglementation limite à 10% de l'actif la détention de titres d'un même émetteur pour un OPCVM.",
    "themeId": 8,
    "theme": "Gestion collective / compte de tiers"
  },
  {
    "type": "C",
    "question": "Quelle affirmation concernant un ordre à cours limité est exacte ?",
    "choices": [
      "Il garantit le prix mais pas l'exécution",
      "Il garantit l'exécution mais pas le prix",
      "Il garantit à la fois le prix et l'exécution"
    ],
    "correctIndex": 0,
    "explanation": "Un ordre à cours limité s'exécute uniquement au prix indiqué ou meilleur, sans garantie d'exécution.",
    "themeId": 9,
    "theme": "Fonctionnement et organisation des marchés"
  },
  {
    "type": "C",
    "question": "Comment est calculé un indice pondéré par la capitalisation ?",
    "choices": [
      "En donnant un poids égal à chaque action",
      "En pondérant par la valeur de marché des titres",
      "En pondérant par le volume de transactions"
    ],
    "correctIndex": 1,
    "explanation": "Un indice pondéré par la capitalisation donne un poids proportionnel à la valeur boursière de chaque titre.",
    "themeId": 9,
    "theme": "Fonctionnement et organisation des marchés"
  },
  {
    "type": "C",
    "question": "Quel est l'effet d'une augmentation de la liquidité sur la fourchette de prix (spread) ?",
    "choices": [
      "Elle élargit le spread",
      "Elle réduit le spread",
      "Elle n'a aucun effet sur le spread"
    ],
    "correctIndex": 2,
    "explanation": "Une liquidité accrue resserre le spread, car le coût de transaction diminue.",
    "themeId": 9,
    "theme": "Fonctionnement et organisation des marchés"
  },
  {
    "type": "C",
    "question": "Selon l'hypothèse d'efficience des marchés, quelle affirmation est vraie ?",
    "choices": [
      "Les cours reflètent toute l'information disponible",
      "Les cours sont influencés par les rumeurs",
      "Les cours sont déterminés par les fondamentaux uniquement"
    ],
    "correctIndex": 0,
    "explanation": "L'efficience informationnelle implique que les prix intègrent instantanément toute information pertinente.",
    "themeId": 9,
    "theme": "Fonctionnement et organisation des marchés"
  },
  {
    "type": "C",
    "question": "Quel est le rôle d'une contrepartie centrale (CCP) dans un marché organisé ?",
    "choices": [
      "Elle fixe les prix d'équilibre lors de l'ouverture",
      "Elle garantit la bonne fin des transactions en se substituant aux parties",
      "Elle surveille les abus de marché en analysant les ordres"
    ],
    "correctIndex": 1,
    "explanation": "La CCP s'interpose entre acheteurs et vendeurs pour garantir l'exécution des transactions.",
    "themeId": 9,
    "theme": "Fonctionnement et organisation des marchés"
  },
  {
    "type": "C",
    "question": "Un ordre d'achat à cours limité est exécuté si le prix du marché est...",
    "choices": [
      "inférieur ou égal au prix limite",
      "supérieur ou égal au prix limite",
      "exactement égal au prix limite"
    ],
    "correctIndex": 0,
    "explanation": "Un ordre à cours limité d'achat ne s'exécute qu'à un prix inférieur ou égal à la limite fixée.",
    "themeId": 9,
    "theme": "Fonctionnement et organisation des marchés"
  },
  {
    "type": "C",
    "question": "Dans un marché dirigé par les ordres, le carnet d'ordres central sert à...",
    "choices": [
      "enregistrer les transactions hors marché",
      "surveiller les positions des membres",
      "apparier les ordres d'achat et de vente selon des règles de priorité"
    ],
    "correctIndex": 2,
    "explanation": "Le carnet d'ordres central est le mécanisme de confrontation des ordres qui détermine les prix.",
    "themeId": 9,
    "theme": "Fonctionnement et organisation des marchés"
  },
  {
    "type": "C",
    "question": "Quelle est la conséquence d'un ordre d'achat à cours limité dont le prix est supérieur au meilleur prix vendeur ?",
    "choices": [
      "Il est exécuté immédiatement au meilleur prix vendeur",
      "Il reste en carnet d'ordres en attente",
      "Il est exécuté au prix limite"
    ],
    "correctIndex": 0,
    "explanation": "Un ordre d'achat à cours limité au-dessus du meilleur vendeur est exécutable immédiatement au meilleur prix disponible.",
    "themeId": 9,
    "theme": "Fonctionnement et organisation des marchés"
  },
  {
    "type": "C",
    "question": "Dans un système de négociation avec fixing, comment est déterminé le prix d'équilibre ?",
    "choices": [
      "Par le dernier prix négocié",
      "Par le prix qui maximise le volume d'ordres exécutés",
      "Par la moyenne des prix limites"
    ],
    "correctIndex": 1,
    "explanation": "Le fixing détermine le prix qui maximise le volume d'ordres exécutés, équilibrant offre et demande.",
    "themeId": 9,
    "theme": "Fonctionnement et organisation des marchés"
  },
  {
    "type": "C",
    "question": "Un indice à pondération égale (equal weight) accorde à chaque composant...",
    "choices": [
      "Un poids proportionnel à sa capitalisation",
      "Un poids inversement proportionnel à sa volatilité",
      "Un poids identique"
    ],
    "correctIndex": 2,
    "explanation": "Dans un indice à pondération égale, chaque action a le même poids, indépendamment de sa capitalisation.",
    "themeId": 9,
    "theme": "Fonctionnement et organisation des marchés"
  },
  {
    "type": "C",
    "question": "Quel est l'objectif principal du mécanisme de livraison contre paiement (DVP) dans le règlement-livraison ?",
    "choices": [
      "Éliminer le risque de principal",
      "Réduire les frais de transaction",
      "Accélérer la vitesse de règlement"
    ],
    "correctIndex": 0,
    "explanation": "Le DVP lie la livraison des titres au paiement, supprimant le risque de principal.",
    "themeId": 10,
    "theme": "Post-marché et infrastructures de marché"
  },
  {
    "type": "C",
    "question": "Dans l'Union européenne, quel est le délai standard de règlement-livraison pour les transactions sur titres ?",
    "choices": [
      "J+1",
      "J+2",
      "J+3"
    ],
    "correctIndex": 1,
    "explanation": "Depuis 2014, le règlement-livraison standard est de T+2 jours ouvrés.",
    "themeId": 10,
    "theme": "Post-marché et infrastructures de marché"
  },
  {
    "type": "C",
    "question": "Quel est le rôle d'une contrepartie centrale (CCP) dans une opération de marché ?",
    "choices": [
      "Elle fournit des services de conservation de titres",
      "Elle fixe les prix des instruments financiers",
      "Elle garantit la bonne fin des transactions en devenant acheteur et vendeur"
    ],
    "correctIndex": 2,
    "explanation": "La CCP s'interpose entre les parties, devenant contrepartie de chacune, réduisant le risque de contrepartie.",
    "themeId": 10,
    "theme": "Post-marché et infrastructures de marché"
  },
  {
    "type": "C",
    "question": "Quelle est la principale caractéristique de TARGET2-Securities (T2S) ?",
    "choices": [
      "C'est un système de règlement-livraison de titres en monnaie de banque centrale",
      "C'est un système de compensation multilatérale",
      "C'est un système de négociation d'actions"
    ],
    "correctIndex": 0,
    "explanation": "T2S est une plateforme de règlement-livraison de titres en monnaie de banque centrale.",
    "themeId": 10,
    "theme": "Post-marché et infrastructures de marché"
  },
  {
    "type": "C",
    "question": "Quel est l'effet principal de la compensation multilatérale sur les transactions de gré à gré ?",
    "choices": [
      "Elle réduit le nombre de transactions à régler en nettant les positions.",
      "Elle augmente le risque de contrepartie en multipliant les expositions.",
      "Elle élimine tout besoin de garanties pour les membres."
    ],
    "correctIndex": 0,
    "explanation": "La compensation nette les obligations réciproques, réduisant ainsi le volume des règlements.",
    "themeId": 10,
    "theme": "Post-marché et infrastructures de marché"
  },
  {
    "type": "C",
    "question": "Dans un système de règlement-livraison, que garantit le principe de livraison contre paiement (DVP) ?",
    "choices": [
      "Que les titres sont livrés avant le paiement, avec un délai de grâce.",
      "Que le transfert de titres et le paiement sont simultanés et irrévocables.",
      "Que le paiement est effectué avant la livraison, sans condition."
    ],
    "correctIndex": 1,
    "explanation": "Le DVP assure la simultanéité des deux flux, éliminant le risque principal.",
    "themeId": 10,
    "theme": "Post-marché et infrastructures de marché"
  },
  {
    "type": "C",
    "question": "Quel est le rôle principal d'une contrepartie centrale (CCP) dans une opération de marché ?",
    "choices": [
      "Elle agit comme un simple intermédiaire sans assumer de risque.",
      "Elle garantit uniquement la livraison des titres, pas le paiement.",
      "Elle se substitue aux deux parties, devenant l'acheteur et le vendeur."
    ],
    "correctIndex": 2,
    "explanation": "La CCP s'interpose entre les parties, assumant le risque de contrepartie.",
    "themeId": 10,
    "theme": "Post-marché et infrastructures de marché"
  },
  {
    "type": "C",
    "question": "Dans le processus de règlement-livraison, quel est le rôle principal d'un dépositaire central ?",
    "choices": [
      "Garantir la contrepartie en cas de défaut",
      "Conserver les titres et assurer leur transfert",
      "Fixer les prix des transactions"
    ],
    "correctIndex": 1,
    "explanation": "Le dépositaire central détient les titres et facilite leur transfert lors du règlement.",
    "themeId": 10,
    "theme": "Post-marché et infrastructures de marché"
  },
  {
    "type": "C",
    "question": "Quelle est la conséquence d'un défaut de paiement d'un membre compensateur auprès d'une chambre de compensation ?",
    "choices": [
      "La chambre annule toutes les transactions du membre",
      "La chambre utilise le fonds de garantie pour couvrir les pertes",
      "La chambre transfère les positions à un autre membre sans frais"
    ],
    "correctIndex": 1,
    "explanation": "Le fonds de garantie mutualisé sert à absorber les pertes en cas de défaut d'un membre.",
    "themeId": 10,
    "theme": "Post-marché et infrastructures de marché"
  },
  {
    "type": "C",
    "question": "En Europe, le délai standard de règlement-livraison pour les actions est de combien de jours après la date de transaction ?",
    "choices": [
      "T+1",
      "T+2",
      "T+3"
    ],
    "correctIndex": 1,
    "explanation": "Le règlement-livraison standard est T+2 pour les actions sur les marchés européens.",
    "themeId": 10,
    "theme": "Post-marché et infrastructures de marché"
  },
  {
    "type": "C",
    "question": "Lors d'une augmentation de capital par émission de droits préférentiels de souscription, un actionnaire qui ne souhaite pas souscrire peut-il vendre ses droits ?",
    "choices": [
      "Oui, les droits sont négociables sur le marché pendant la période de souscription",
      "Non, les droits sont obligatoirement exercés ou perdus",
      "Oui, mais uniquement auprès de la société émettrice"
    ],
    "correctIndex": 0,
    "explanation": "Les droits préférentiels de souscription sont des titres négociables et peuvent être cédés sur le marché.",
    "themeId": 11,
    "theme": "Émissions et opérations sur titres"
  },
  {
    "type": "C",
    "question": "Quel est l'effet d'une division de la valeur nominale d'une action (split) sur le capital social d'une société ?",
    "choices": [
      "Le capital social augmente proportionnellement",
      "Le capital social reste inchangé",
      "Le capital social diminue en raison des frais"
    ],
    "correctIndex": 1,
    "explanation": "Un split modifie le nombre d'actions mais pas le montant total du capital social.",
    "themeId": 11,
    "theme": "Émissions et opérations sur titres"
  },
  {
    "type": "C",
    "question": "Dans le cadre d'une émission obligataire à taux variable, le coupon est généralement indexé sur quel type de taux ?",
    "choices": [
      "Un taux fixe déterminé à l'émission",
      "Un taux de référence du marché monétaire ou obligataire",
      "Le taux de rendement des actions de l'émetteur"
    ],
    "correctIndex": 1,
    "explanation": "Le coupon variable est révisé périodiquement selon un taux de référence comme l'Euribor ou l'OAT.",
    "themeId": 11,
    "theme": "Émissions et opérations sur titres"
  },
  {
    "type": "C",
    "question": "Quelle est la conséquence d'une offre publique de rachat (OPR) réussie sur le flottant d'une société cotée ?",
    "choices": [
      "Le flottant augmente car les actions sont redistribuées",
      "Le flottant diminue car l'initiateur détient une part plus importante",
      "Le flottant reste identique car les actions sont annulées"
    ],
    "correctIndex": 1,
    "explanation": "L'OPR réduit le nombre d'actions en circulation hors de l'initiateur, donc le flottant baisse.",
    "themeId": 11,
    "theme": "Émissions et opérations sur titres"
  },
  {
    "type": "C",
    "question": "Lors d'une augmentation de capital avec maintien du droit préférentiel de souscription, le prix d'émission des actions nouvelles est généralement...",
    "choices": [
      "supérieur au cours de bourse",
      "inférieur au cours de bourse",
      "égal au cours de bourse"
    ],
    "correctIndex": 1,
    "explanation": "Le prix d'émission est fixé en dessous du cours de bourse pour inciter les actionnaires à exercer leurs droits.",
    "themeId": 11,
    "theme": "Émissions et opérations sur titres"
  },
  {
    "type": "C",
    "question": "Quel est l'effet d'une augmentation de capital par incorporation de réserves sur le nombre d'actions ?",
    "choices": [
      "Le nombre d'actions augmente",
      "Le nombre d'actions diminue",
      "Le nombre d'actions reste inchangé"
    ],
    "correctIndex": 0,
    "explanation": "L'incorporation de réserves émet de nouvelles actions gratuites, augmentant le nombre d'actions sans modification du capital.",
    "themeId": 11,
    "theme": "Émissions et opérations sur titres"
  },
  {
    "type": "C",
    "question": "Lors de l'émission d'une obligation à taux fixe, si le taux de marché est inférieur au taux nominal, le prix d'émission sera...",
    "choices": [
      "inférieur au pair",
      "égal au pair",
      "supérieur au pair"
    ],
    "correctIndex": 2,
    "explanation": "Pour compenser un taux nominal supérieur, l'obligation est émise avec une prime, donc au-dessus du pair.",
    "themeId": 11,
    "theme": "Émissions et opérations sur titres"
  },
  {
    "type": "C",
    "question": "Lors d'une augmentation de capital avec droit préférentiel de souscription (DPS), quel est l'effet immédiat pour un actionnaire existant qui ne souscrit pas ?",
    "choices": [
      "Il reçoit une compensation en espèces équivalente à la valeur du DPS",
      "Il subit une dilution de sa participation, mais peut vendre ses DPS pour compenser",
      "Il conserve automatiquement sa part si le nombre d'actions est inchangé"
    ],
    "correctIndex": 1,
    "explanation": "Sans souscription, la part relative diminue, mais la vente des DPS compense partiellement la dilution.",
    "themeId": 11,
    "theme": "Émissions et opérations sur titres"
  },
  {
    "type": "C",
    "question": "Quelle est la conséquence d'un split (division du nominal) sur le capital social d'une société ?",
    "choices": [
      "Le capital social augmente proportionnellement au nombre de nouvelles actions",
      "Le capital social reste inchangé, mais le nombre d'actions augmente",
      "Le capital social diminue car la valeur nominale est réduite"
    ],
    "correctIndex": 1,
    "explanation": "Un split modifie le nombre d'actions et le nominal, mais le capital social total reste identique.",
    "themeId": 11,
    "theme": "Émissions et opérations sur titres"
  },
  {
    "type": "C",
    "question": "Dans une OPA (offre publique d'achat), quel est le rôle de l'AMF ?",
    "choices": [
      "Elle fixe le prix d'achat des titres visés",
      "Elle garantit le succès de l'offre en achetant les titres non apportés",
      "Elle contrôle la régularité et l'information diffusée pendant l'offre"
    ],
    "correctIndex": 2,
    "explanation": "L'AMF supervise la transparence et le respect des règles, sans fixer le prix ni garantir l'offre.",
    "themeId": 11,
    "theme": "Émissions et opérations sur titres"
  },
  {
    "type": "C",
    "question": "Dans le bilan comptable, quelle relation fondamentale est toujours vérifiée ?",
    "choices": [
      "Actif = Passif - Capitaux propres",
      "Actif = Passif + Capitaux propres",
      "Actif + Passif = Capitaux propres"
    ],
    "correctIndex": 1,
    "explanation": "L'équation fondamentale du bilan est Actif = Passif + Capitaux propres.",
    "themeId": 12,
    "theme": "Bases comptables et financières"
  },
  {
    "type": "C",
    "question": "Quelle est la principale différence entre le résultat comptable et la trésorerie nette ?",
    "choices": [
      "Le résultat inclut les charges non décaissées comme les amortissements",
      "La trésorerie inclut les produits non encaissés",
      "Ils sont toujours identiques"
    ],
    "correctIndex": 0,
    "explanation": "Le résultat comptable intègre des charges calculées sans sortie de trésorerie, contrairement à la trésorerie.",
    "themeId": 12,
    "theme": "Bases comptables et financières"
  },
  {
    "type": "C",
    "question": "Quel est l'effet d'une dotation aux amortissements sur le résultat et la trésorerie ?",
    "choices": [
      "Diminue le résultat et diminue la trésorerie",
      "Augmente le résultat et n'affecte pas la trésorerie",
      "Diminue le résultat mais n'affecte pas la trésorerie"
    ],
    "correctIndex": 2,
    "explanation": "L'amortissement est une charge non décaissée : il réduit le résultat sans impact sur la trésorerie.",
    "themeId": 12,
    "theme": "Bases comptables et financières"
  },
  {
    "type": "C",
    "question": "Le ratio de liquidité générale se calcule comme :",
    "choices": [
      "Trésorerie / Passif circulant",
      "Actif circulant / Passif circulant",
      "Capitaux propres / Total du bilan"
    ],
    "correctIndex": 1,
    "explanation": "La liquidité générale compare l'actif circulant au passif circulant pour mesurer la solvabilité à court terme.",
    "themeId": 12,
    "theme": "Bases comptables et financières"
  },
  {
    "type": "C",
    "question": "Une entreprise acquiert une machine pour 20 000 €, sans valeur résiduelle, amortissable sur 4 ans en linéaire. Quel est l'amortissement annuel ?",
    "choices": [
      "4 000 €",
      "5 000 €",
      "6 000 €"
    ],
    "correctIndex": 1,
    "explanation": "L'amortissement linéaire se calcule en divisant le coût par la durée d'utilisation : 20 000 / 4 = 5 000 €.",
    "themeId": 12,
    "theme": "Bases comptables et financières"
  },
  {
    "type": "C",
    "question": "Si une entreprise allonge le délai de paiement accordé à ses clients, quel est l'effet sur son besoin en fonds de roulement (BFR) ?",
    "choices": [
      "Le BFR diminue",
      "Le BFR reste inchangé",
      "Le BFR augmente"
    ],
    "correctIndex": 2,
    "explanation": "L'allongement du délai client accroît les créances, donc le BFR augmente.",
    "themeId": 12,
    "theme": "Bases comptables et financières"
  },
  {
    "type": "C",
    "question": "Un ratio de liquidité générale inférieur à 1 indique que :",
    "choices": [
      "L'entreprise dispose d'un excédent de trésorerie",
      "L'actif à court terme ne couvre pas le passif à court terme",
      "L'entreprise est en situation de cessation de paiement"
    ],
    "correctIndex": 1,
    "explanation": "Un ratio inférieur à 1 signifie que les dettes à court terme excèdent les actifs à court terme.",
    "themeId": 12,
    "theme": "Bases comptables et financières"
  },
  {
    "type": "C",
    "question": "Quel est l'effet d'une augmentation des amortissements sur le résultat net d'une entreprise ?",
    "choices": [
      "Diminue le résultat net",
      "Augmente le résultat net",
      "N'a aucun effet"
    ],
    "correctIndex": 0,
    "explanation": "Les amortissements sont des charges qui réduisent le résultat net.",
    "themeId": 12,
    "theme": "Bases comptables et financières"
  },
  {
    "type": "C",
    "question": "Dans le bilan comptable, le fonds de roulement net global (FRNG) se calcule par :",
    "choices": [
      "Capitaux propres - Actif immobilisé",
      "Actif circulant - Passif circulant",
      "Trésorerie nette - Dettes financières"
    ],
    "correctIndex": 1,
    "explanation": "Le FRNG est la différence entre l'actif circulant et le passif circulant.",
    "themeId": 12,
    "theme": "Bases comptables et financières"
  },
  {
    "type": "C",
    "question": "Quelle est la conséquence d'une augmentation du besoin en fonds de roulement (BFR) sur la trésorerie d'une entreprise ?",
    "choices": [
      "La trésorerie augmente",
      "La trésorerie reste inchangée",
      "La trésorerie diminue"
    ],
    "correctIndex": 2,
    "explanation": "Une hausse du BFR nécessite un financement supplémentaire, réduisant la trésorerie.",
    "themeId": 12,
    "theme": "Bases comptables et financières"
  },
  {
    "type": "A",
    "question": "Quelle autorité délivre l'agrément aux sociétés de gestion de portefeuille en France ?",
    "choices": [
      "L'AMF",
      "L'ACPR",
      "L'ESMA"
    ],
    "correctIndex": 0,
    "explanation": "L'AMF est l'autorité compétente pour agréer les sociétés de gestion en France.",
    "theme": "Cadre institutionnel et réglementaire",
    "themeId": 1
  },
  {
    "type": "A",
    "question": "Selon MiFID II, quelle est la durée minimale de conservation des enregistrements des ordres et transactions par les prestataires de services d'investissement ?",
    "choices": [
      "3 ans",
      "5 ans",
      "10 ans"
    ],
    "correctIndex": 1,
    "explanation": "MiFID II impose une conservation d'au moins 5 ans pour ces enregistrements.",
    "theme": "Cadre institutionnel et réglementaire",
    "themeId": 1
  },
  {
    "type": "C",
    "question": "Quelle est la principale mission de l'ESMA en matière de supervision ?",
    "choices": [
      "Coordonner la surveillance des agences de notation et des infrastructures de marché",
      "Superviser directement les banques systémiques",
      "Fixer les taux d'intérêt de la zone euro"
    ],
    "correctIndex": 0,
    "explanation": "L'ESMA coordonne la supervision des agences de notation et des infrastructures de marché.",
    "theme": "Cadre institutionnel et réglementaire",
    "themeId": 1
  },
  {
    "type": "C",
    "question": "Un ordre de bourse 'à la meilleure limite' est un ordre qui :",
    "choices": [
      "est exécuté au prix du marché dès réception",
      "est exécuté au meilleur prix disponible dans le carnet d'ordres",
      "est exécuté uniquement si le prix atteint une limite"
    ],
    "correctIndex": 1,
    "explanation": "Un ordre à la meilleure limite est exécuté au meilleur prix disponible dans le carnet d'ordres.",
    "theme": "Cadre institutionnel et réglementaire",
    "themeId": 1
  },
  {
    "type": "A",
    "question": "Selon le règlement Prospectus, quelle est la durée de validité d'un prospectus approuvé par l'AMF ?",
    "choices": [
      "6 mois",
      "12 mois",
      "24 mois"
    ],
    "correctIndex": 1,
    "explanation": "Le prospectus est valable 12 mois après approbation, sous réserve de modifications.",
    "theme": "Cadre institutionnel et réglementaire",
    "themeId": 1
  },
  {
    "type": "A",
    "question": "Selon MiFID II, quelle est la durée minimale de conservation des enregistrements téléphoniques par les entreprises d'investissement ?",
    "choices": [
      "3 ans",
      "7 ans",
      "5 ans"
    ],
    "correctIndex": 2,
    "explanation": "MiFID II impose une conservation de 5 ans, extensible à 7 ans sur demande.",
    "theme": "Cadre institutionnel et réglementaire",
    "themeId": 1
  },
  {
    "type": "C",
    "question": "Quel est l'effet du passeport européen pour un OPCVM agréé en France ?",
    "choices": [
      "Il permet sa commercialisation dans tous les États membres sans agrément local",
      "Il exige un agrément dans chaque pays de commercialisation",
      "Il ne s'applique qu'aux fonds alternatifs"
    ],
    "correctIndex": 0,
    "explanation": "Le passeport européen autorise la libre commercialisation des OPCVM dans l'UE après notification.",
    "theme": "Cadre institutionnel et réglementaire",
    "themeId": 1
  },
  {
    "type": "A",
    "question": "Quelle autorité est chargée de la surveillance prudentielle des établissements de crédit en France ?",
    "choices": [
      "L'ACPR",
      "L'AMF",
      "L'ESMA"
    ],
    "correctIndex": 0,
    "explanation": "L'ACPR assure la surveillance prudentielle des banques et assurances.",
    "theme": "Cadre institutionnel et réglementaire",
    "themeId": 1
  },
  {
    "type": "A",
    "question": "Selon MiFID II, quelle obligation incombe aux entreprises d'investissement pour l'exécution des ordres clients ?",
    "choices": [
      "Garantir le prix le plus bas",
      "Prendre toutes les mesures suffisantes pour obtenir le meilleur résultat possible",
      "Exécuter sur le marché principal"
    ],
    "correctIndex": 1,
    "explanation": "MiFID II impose une obligation de meilleure exécution.",
    "theme": "Cadre institutionnel et réglementaire",
    "themeId": 1
  },
  {
    "type": "C",
    "question": "Que permet le passeport européen pour une société de gestion ?",
    "choices": [
      "Gérer des fonds sans agrément national",
      "Éviter toute obligation de déclaration",
      "Commercialiser des fonds dans l'UE sans agrément supplémentaire"
    ],
    "correctIndex": 2,
    "explanation": "Le passeport permet de commercialiser des fonds dans l'UE sans nouvel agrément.",
    "theme": "Cadre institutionnel et réglementaire",
    "themeId": 1
  },
  {
    "type": "A",
    "question": "Selon le règlement général de l'AMF, quelle est la mission principale du responsable de la conformité et du contrôle interne (RCCI) ?",
    "choices": [
      "Veiller à la mise en œuvre des procédures de conformité et informer la direction des manquements.",
      "Assurer la gestion des risques de crédit de l'entreprise.",
      "Superviser les opérations de marché en temps réel."
    ],
    "correctIndex": 0,
    "explanation": "Le RCCI est chargé de la conformité et du contrôle interne, notamment le suivi des procédures et le signalement des manquements.",
    "theme": "Déontologie et conformité",
    "themeId": 2
  },
  {
    "type": "A",
    "question": "En matière de déontologie, quelle est l'obligation d'un prestataire de services d'investissement concernant les opérations personnelles de ses collaborateurs ?",
    "choices": [
      "Il doit déclarer ces opérations à l'AMF dans un délai de 5 jours ouvrés.",
      "Il doit mettre en place un registre des opérations personnelles et le conserver pendant 5 ans.",
      "Il doit interdire toute opération personnelle sur les instruments financiers."
    ],
    "correctIndex": 1,
    "explanation": "Le prestataire doit tenir un registre des opérations personnelles et le conserver pendant 5 ans.",
    "theme": "Déontologie et conformité",
    "themeId": 2
  },
  {
    "type": "C",
    "question": "Dans le cadre de la lutte contre le blanchiment, quelle est la procédure applicable pour une déclaration de soupçon à Tracfin ?",
    "choices": [
      "La déclaration doit être faite par écrit dans un délai de 48 heures.",
      "La déclaration est facultative si le montant est inférieur à 10 000 euros.",
      "La déclaration doit être faite avant toute exécution de l'opération suspecte."
    ],
    "correctIndex": 2,
    "explanation": "La déclaration de soupçon doit être faite avant l'exécution de l'opération suspecte.",
    "theme": "Déontologie et conformité",
    "themeId": 2
  },
  {
    "type": "C",
    "question": "Quelle est la sanction maximale que l'AMF peut prononcer à l'encontre d'une société de gestion pour manquement à ses obligations de conformité ?",
    "choices": [
      "Une amende de 100 millions d'euros ou 10% du chiffre d'affaires annuel.",
      "Une interdiction d'exercer pendant 10 ans.",
      "Une radiation de la liste des sociétés de gestion."
    ],
    "correctIndex": 0,
    "explanation": "L'AMF peut infliger une amende administrative de 100 millions d'euros maximum ou 10% du CA.",
    "theme": "Déontologie et conformité",
    "themeId": 2
  }
];
  return new Response(JSON.stringify({ questions }), {
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
