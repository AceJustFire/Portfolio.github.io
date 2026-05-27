/**
* Template Name: Craftivo
* Template URL: https://bootstrapmade.com/craftivo-bootstrap-portfolio-template/
* Updated: Oct 04 2025 with Bootstrap v5.3.8
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
* 
* Custom JavaScript for page interaction: scroll behavior, mobile menu,
* animations, typed text, isotope filtering, lightbox, and sliders.
*/

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function (direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

/* --- CONFIGURATION DES COMPÉTENCES --- */
/* Structured data describing skill categories used by the portfolio.
   Each item includes title, description, image, styling color, and competency details. */


const COMPETENCES = [
  {
    id: "administrer",
    titre: "Administrer",
    description: "Gérer et maintenir des infrastructures réseaux et systèmes.",
    image: "images/skill_administrer.png",
    color: "#e05065",
    ac: [
      {
        code: "AC11.01",
        label: "Maîtriser les lois fondamentales de l'électricité afin d'intervenir sur des équipements de réseaux et télécommunications",
        reflexive: {
          fait: "J'ai étudié la loi d'OHM en TP, mesuré des tensions et courants sur des montages simples avec un multimètre.",
          pourquoi: "Pour pouvoir diagnostiquer des pannes matérielles sur des équipements réseau et comprendre les besoins en alimentation.",
          comment: "Via les TP, utilisation d'un multimètre et d'une platine de test, appui sur les cours théoriques d'électricité.",
          difficultes: "La conversion entre unités et l'application des formules dans des circuits mixtes séries/parallèles m'ont posé des difficultés.",
          appris: "J'ai compris comment calculer la consommation d'un switch ou d'un routeur PoE, et l'importance des protections électriques dans les baies réseau.",
          autrement: "Je ferais plus de schémas annotés pour visualiser les circuits avant de mesurer.",
          projet: { titre: "TP Électricité", lien: null, desc: "Montage et mesure de circuits résistifs en série et parallèle, relevé de courbes tension/courant." }
        }
      },
      {
        code: "AC11.02",
        label: "Comprendre l'architecture et les fondements des systèmes numériques, les principes du codage de l'information, des communications et de l'Internet",
        reflexive: {
          fait: "J'ai étudié les modèles OSI et TCP/IP, analysé des trames avec Wireshark et compris les mécanismes d'encapsulation des données.",
          pourquoi: "Comprendre comment l'information circule dans un réseau est indispensable pour administrer et sécuriser une infrastructure.",
          comment: "Cours, TP Wireshark pour capturer et décoder des paquets HTTP, DNS, ICMP. Documentation RFC et supports de cours.",
          difficultes: "La lecture des trames en hexadécimal et l'identification des en-têtes de chaque couche ont demandé beaucoup de pratique.",
          appris: "J'ai acquis une vision claire du chemin qu'emprunte un paquet, ce qui m'aide maintenant à diagnostiquer les problèmes réseau couche par couche.",
          autrement: "Je commencerais directement par capturer du trafic réel plutôt que des exemples théoriques, pour rendre l'apprentissage plus concret.",
          projet: { titre: "TP Wireshark", lien: null, desc: "Capture et analyse de trames réseau : identification des protocoles, lecture des en-têtes IPv4, TCP, DNS." }
        }
      },
      {
        code: "AC11.03",
        label: "Configurer les fonctions de base du réseau local",
        reflexive: {
          fait: "J'ai configuré des switchs et routeurs en CLI : adresses IP, VLAN, routage statique, protocole DHCP.",
          pourquoi: "C'est la compétence principale du technicien réseau : sans savoir configurer un réseau local, impossible d'assurer sa disponibilité.",
          comment: "Simulations réseau, puis équipements réels en TP. Appui sur la documentation de sysco et des cours de TP.",
          difficultes: "Le routage inter-VLAN a été complexe. J'ai dû recommencer plusieurs fois.",
          appris: "Je maîtrise maintenant les commandes de base et la logique de segmentation réseau par VLAN.",
          autrement: "Je documenterais chaque configuration dans un write-up avec captures d'écran pour pouvoir refaire les manipulations.",
          projet: { titre: "Déploiement de réseau local", lien: "https://github.com/AceJustFire/writeups/blob/main/2026-02-19/writeup-deploiement-d-un-reseau-local.md", desc: "Configuration de topologies réseau avec VLAN et routage inter-VLAN." }
        }
      },
      {
        code: "AC11.04",
        label: "Maîtriser les rôles et les principes fondamentaux des systèmes d'exploitation afin d'interagir avec ceux-ci pour la configuration et l'administration des réseaux et services fournis",
        reflexive: {
          fait: "J'ai utilisé Linux en ligne de commande : gestion des fichiers, droits utilisateurs, configuration réseau, services système.",
          pourquoi: "La majorité des serveurs réseau fonctionnent sous Linux. Maîtriser le terminal est incontournable pour administrer des services.",
          comment: "TP systèmes, tutoriels en ligne, pratique personnelle sur machine virtuelle.",
          difficultes: "La gestion des droits et la compréhension des processus en arrière-plan ont été les points les plus difficiles.",
          appris: "Je me sens à l'aise dans un terminal Linux pour des tâches d'administration basiques et je comprends le rôle des principaux services réseau.",
          autrement: "J'installerais un serveur Linux chez moi dès le début pour pratiquer quotidiennement et pas uniquement en TP.",
          projet: { titre: "TP Systèmes Linux", lien: null, desc: "Installation et configuration de serveur Linux, gestion des utilisateurs et des services réseau de base." }
        }
      },
      {
        code: "AC11.05",
        label: "Identifier les dysfonctionnements du réseau local et savoir les signaler",
        reflexive: {
          fait: "J'ai pratiqué le diagnostic réseau avec des outils de ligne de commande et des analyseurs de trames pour localiser des pannes simulées en TP.",
          pourquoi: "Savoir identifier et signaler un problème réseau est essentiel pour maintenir la disponibilité des services et collaborer avec une équipe.",
          comment: "Scénarios de panne en TP, méthodologie de diagnostic couche par couche, rédaction de rapports d'incident.",
          difficultes: "Distinguer une panne de couche liaison d'une panne de couche réseau a été difficile sans méthode rigoureuse au départ.",
          appris: "J'ai intégré une méthode de diagnostic systématique, ce qui accélère la résolution.",
          autrement: "Ne pas négliger comment je construis mes rapports.",
          projet: { titre: "Diagnostic réseau", lien: null, desc: "Identification et résolution de pannes réseau simulées : câbles défectueux, mauvaise configuration IP, boucle de commutation." }
        }
      },
      {
        code: "AC11.06",
        label: "Installer un poste client, expliquer la procédure mise en place",
        reflexive: {
          fait: "J'ai installé et configuré des postes de travail : partitionnement, installation OS, configuration réseau, installation de logiciels métier.",
          pourquoi: "L'installation de postes clients fait partie du quotidien d'un technicien. Savoir expliquer la procédure est essentiel pour la documentation et la transmission.",
          comment: "Pratique en environnement professionnel et scolaire avec windows server.",
          difficultes: "Documenter étape par étape chaque processus était le plus compliqué.",
          appris: "J'ai compris l'importance de la documentation technique : une procédure bien rédigée fait gagner beaucoup de temps lors d'interventions futures.",
          autrement: "Je prendrais des captures d'écran systématiquement à chaque étape dès le début du travail.",
          projet: { titre: "Déploiement de postes", lien: null, desc: "Installation et configuration de postes clients : partitionnement, installation OS, configuration réseau, mise à jour des pilotes." }
        }
      }
    ]
  },
  {
    id: "connecter",
    titre: "Connecter",
    description: "Mettre en place et configurer des équipements pour interconnecter des réseaux.",
    image: "images/skill_connecter.png",
    color: "#e07a3f",
    ac: [
      {
        code: "AC12.01",
        label: "Maîtriser les technologies filaires des réseaux locaux",
        reflexive: {
          fait: "J'ai réalisé des câblages et étudié les caractéristiques des différentes catégories de câbles.",
          pourquoi: "Le câblage structuré est la base physique de tout réseau. Un câble mal réalisé peut provoquer des problèmes compliqués à résoudre.",
          comment: "TP de câblage (tout les TP en réels).",
          difficultes: "Respecter l'ordre des cables, des switchs aux routeurs.",
          appris: "Je sais réaliser un câblage de manière autonome.",
          autrement: "Je m'entraînerais sur plus TP cablé (ex : OSPF et RIP).",
          projet: { titre: "Câblages structurés", lien: null, desc: "Câblages structurés de switchs et routeurs." }
        }
      },
      {
        code: "AC12.02",
        label: "Maîtriser les technologies des réseaux locaux sans fil",
        reflexive: {
          fait: "J'ai étudié les standards sans fil, configuré des points d'accès.",
          pourquoi: "Le sans-fil est omniprésent. Comprendre ses mécanismes permet de déployer et sécuriser des réseaux Wi-Fi.",
          comment: "Cours, TP de configuration de points d'accès (ex : passerelle linux).",
          difficultes: "La gestion des interférences n'était pas intuitif au départ.",
          appris: "Je comprends les compromis entre portée, débit et sécurité selon le standard choisi et l'environnement de déploiement.",
          autrement: "Je rejnforcerais ma compréhension théorique et je m'entrainerais plus sur les TP.",
          projet: { titre: "Réseaux sans fil", lien: null, desc: "Configuration de points d'accès, analyse du spectre sans fil, optimisation du plan de canaux." }
        }
      },
      {
        code: "AC12.03",
        label: "Mettre en place un réseau local",
        reflexive: {
          fait: "J'ai conçu et déployé des topologies réseau complètes : plan d'adressage, câblage, configuration des équipements, tests de connectivité.",
          pourquoi: "Mettre en place un réseau de bout en bout intègre toutes les compétences de connexion : c'est l'application concrète des apprentissages théoriques.",
          comment: "Projets en équipe, utilisation de simulateurs comme cisco packet tracer pour la conception puis équipements réels pour le déploiement.",
          difficultes: "La gestion du plan d'adressage pour éviter les conflits IP et assurer une organisation logique a nécessité plusieurs essais.",
          appris: "J'ai appris à planifier avant d'agir : un bon plan d'adressage documenté évite la majorité des problèmes de configuration.",
          autrement: "Je rédigerais un document de conception avant de toucher au moindre équipement.",
          projet: { titre: "Déploiement complet", lien: null, desc: "Déploiement d'un réseau local : câblage, plan d'adressage, configuration des équipements actifs et tests." }
        }
      },
      {
        code: "AC12.04",
        label: "Maîtriser les technologies de transmission sur longue distance",
        reflexive: {
          fait: "J'ai étudié les technologies d'accès distant et compris les mécanismes de connexion.",
          pourquoi: "Connecter un réseau local à Internet ou à un site distant passe par des technologies qu'un technicien réseau doit connaître.",
          comment: "Cours théoriques, documentation technique, cas pratiques d'analyse de liaisons distantes (ex : ssh).",
          difficultes: "Comprendre les mécanismes d'encapsulation et la différence entre adresses publiques et privées.",
          appris: "J'ai compris le rôle des fournisseurs d'accès, les débits réels vs théoriques et les enjeux des connexions distantes.",
          autrement: "J'essaierai d'apprendre toutes les commandes pour configurer ssh entièrement.",
          projet: { titre: "Étude des accès distants", lien: null, desc: "Étude comparative des technologies d'accès distant et configuration de liaisons sécurisées." }
        }
      },
      {
        code: "AC12.05",
        label: "Communiquer avec un client ou un utilisateur",
        reflexive: {
          fait: "J'ai assisté des camarades et on à communiqué pour réaliser des projets réels .",
          pourquoi: "Le technicien réseau n'est pas uniquement un expert technique : savoir communiquer clairement avec des non-techniciens est indispensable.",
          comment: "Pratique en TP, reformulation des problèmes techniques en langage accessible.",
          difficultes: "Adapter mon niveau de langage selon l'interlocuteur (technicien ou utilisateur novice) sans être condescendant a demandé de la pratique.",
          appris: "La communication est aussi importante que la technique : tout le monde doit comprendre les mêmes choses.",
          autrement: "Je pratiquerais des jeux de rôle client/technicien pour m'entraîner à expliquer des concepts techniques simplement.",
          projet: { titre: "Assistance technique", lien: null, desc: "Assistance technique aux utilisateurs : explication des interventions, rédaction de comptes-rendus." }
        }
      }
    ]
  },
  {
    id: "programmer",
    titre: "Programmer",
    description: "Développer des scripts et outils pour automatiser les tâches réseaux.",
    image: "images/skill_programmer.png",
    color: "#f4c430",
    ac: [
      {
        code: "AC13.01",
        label: "Utiliser un système informatique et ses outils",
        reflexive: {
          fait: "J'utilise régulièrement des IDE, des outils de versionnement de code, et les outils de développement intégrés.",
          pourquoi: "Maîtriser son environnement de travail est la première étape pour être productif en développement.",
          comment: "Pratique lors de projets, tutoriels sur les outils de versionnement, documentation officielle.",
          difficultes: "La gestion des conflits des paquets et des différentes version sont chronophages à régler.",
          appris: "Je maîtrise maintenant les commandes essentielles et suis à l'aise dans un environnement de développement.",
          autrement: "J'apprendrais les outils de versionnement dès le premier jour d'un projet.",
          projet: { titre: "Environnement de développement", lien: null, desc: "Mise en place d'un environnement de travail avec IDE, gestion du code source et déploiement." }
        }
      },
      {
        code: "AC13.02",
        label: "Lire, comprendre, exécuter, corriger et modifier un programme",
        reflexive: {
          fait: "J'ai lu et modifié du code existant pour l'adapter à mes besoins, en corrigeant des bugs d'affichage ou de logique.",
          pourquoi: "En entreprise, on travaille rarement sur du code écrit de zéro : savoir lire et modifier du code existant est une compétence clé.",
          comment: "Lecture de code source, utilisation d'outils de débogage, recherches documentaires, commentaires laissés.",
          difficultes: "Comprendre des logiques complexes sans en être l'auteur a été compliqu, notamment pour des animations ou du design.",
          appris: "J'ai développé ma capacité à lire du code inconnu méthodiquement : identifier les fonctions, tracer l'exécution, isoler les bugs.",
          autrement: "Je commenterais chaque section du code au fur et à mesure de ma lecture pour garder une trace de ma compréhension.",
          projet: { titre: "Adaptation de code", lien: null, desc: "Compréhension et adaptation de code existant pour de nouveaux besoins." }
        }
      },
      {
        code: "AC13.03",
        label: "Traduire un algorithme dans un langage et pour un environnement donné",
        reflexive: {
          fait: "J'ai implémenté des algorithmes de base et de recherche dans divers langages de programmation.",
          pourquoi: "L'algorithme est la logique. Savoir l'utiliser est fondamental en programmation.",
          comment: "Cours de programmation, exercices pratiques, utilisation d'environnements de développement adaptés.",
          difficultes: "La gestion de la mémoire et les particularités de certains langages de bas niveau ont été difficiles à appréhender.",
          appris: "J'ai compris que l'algorithme prime sur le langage : une fois la logique claire, l'implémentation devient plus accessible.",
          autrement: "Je dessinerais l'organigramme de l'algorithme sur papier avant de coder, pour séparer la réflexion logique de l'implémentation.",
          projet: { titre: "Implémentation algorithmique", lien: null, desc: "Développement et traduction d'algorithmes (variables, boucles, fonctions, structures de données)." }
        }
      },
      {
        code: "AC13.04",
        label: "Connaître l'architecture et les technologies d'un site Web",
        reflexive: {
          fait: "J'ai conçu et développé des interfaces web avec des technologies frontend et backend, notamment avec des api.",
          pourquoi: "Les interfaces web sont omniprésentes dans les outils réseau (interfaces d'administration, tableaux de bord). Comprendre leur architecture est utile.",
          comment: "Cours de développement web, lecture de documentation, tutoriels et pratique sur des projets concrets.",
          difficultes: "La communication entre le backend et la base de données, ainsi que la sécurisation des formulaires ont été des défis.",
          appris: "Je comprends maintenant le modèle client-serveur, le rôle de chaque composant, et les enjeux de sécurité d'une application web.",
          autrement: "Je concevrais la structure des données avant de coder pour éviter des restructurations en cours de projet.",
          projet: { titre: "Développement web", lien: null, desc: "Application web complète : frontend, backend, et intégration de base de données." }
        }
      },
      {
        code: "AC13.05",
        label: "Utiliser les frameworks et bibliothèques",
        reflexive: {
          fait: "J'ai utilisé des frameworks pour la mise en page responsive et des bibliothèques pour les animations et les icônes (ex : bootstrap).",
          pourquoi: "Les frameworks accélèrent le développement et garantissent un résultat professionnel et maintenu. C'est une pratique standard.",
          comment: "Documentation officielle, exemples des autres dévellopeurs, intégration dans des projets.",
          difficultes: "Surcharger les styles par défaut sans casser la responsivité a demandé de comprendre les principes de spécificité et les systèmes de grille.",
          appris: "J'ai appris à utiliser la documentation efficacement et à distinguer ce que je dois coder moi-même de ce que le framework fournit.",
          autrement: "Je lirais la documentation en entier avant de commencer à utiliser un framework pour avoir une vue d'ensemble.",
          projet: { titre: "Intégration de frameworks", lien: null, desc: "Intégration et personnalisation de bibliothèques UI dans un projet web." }
        }
      }
    ]
  },
  {
    id: "securiser",
    titre: "Sécuriser",
    description: "Analyser et renforcer la sécurité des systèmes et des réseaux.",
    image: "images/skill_securiser.png",
    color: "#7cb342",
    ac: []
  },
  {
    id: "surveiller",
    titre: "Surveiller",
    description: "Superviser les performances et détecter les incidents réseau.",
    image: "images/skill_surveiller.png",
    color: "#0099cc",
    ac: []
  }
];

/* --- GENERATION DES CARTES PREMIUM CLICK MODAL --- */

(function () {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;

  // Create modal containers
  const modalHTML = `
        <!-- Level 2 Modal: AC List -->
        <div id="portfolio-modal" class="glass-modal">
          <div class="glass-modal-content">
            <button class="close-modal" onclick="closeCompetenceModal()"><i class="bi bi-x-lg"></i></button>
            <div class="glass-modal-header">
              <img id="modal-img" src="" alt="">
              <h3 id="modal-title"></h3>
            </div>
            <div class="glass-modal-body">
              <h5><i class="bi bi-list-ul"></i> Apprentissages Critiques & SAÉ</h5>
              <div id="modal-ac-list" class="ac-list"></div>
            </div>
          </div>
        </div>

        <!-- Level 3 Modal: Reflexive Details -->
        <div id="portfolio-reflexive-modal" class="glass-modal">
          <div class="glass-modal-content" style="max-width: 900px; max-height: 95vh;">
            <button class="close-modal" onclick="closeReflexiveModal()"><i class="bi bi-arrow-left"></i></button>
            <div class="glass-modal-body" style="padding: 40px 30px;">
              <h4 id="ref-ac-code" style="color: #a8b2ff; font-weight: 700; margin-bottom: 5px;"></h4>
              <h3 id="ref-ac-label" style="color: white; font-size: 1.3rem; margin-bottom: 30px;"></h3>
              
              <div id="reflexive-grid" class="reflexive-grid"></div>

              <div id="reflexive-project" class="reflexive-project mt-4"></div>
            </div>
          </div>
        </div>
      `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Level 2: Open Competence (AC List)
  window.openCompetenceModal = function (id) {
    const comp = COMPETENCES.find(c => c.id === id);
    if (!comp) return;

    // Ensure we handle both 'dropdownItems' (old) and 'ac' (new) just in case
    const acList = comp.ac || comp.dropdownItems || [];

    const itemsHtml = acList.map(function (item, index) {
      const code = item.code ? `<span class="ac-code-badge" style="background: ${comp.color}22; color: ${comp.color}; border: 1px solid ${comp.color}44;">${item.code}</span>` : '';
      const label = item.label || item; // Fallback

      return `<div class="ac-item" style="cursor: pointer;" onclick="openReflexiveModal('${comp.id}', ${index})">
                   <div style="display: flex; align-items: center; justify-content: space-between;">
                     <div>${code} <span style="font-size: 0.95rem; font-weight: 500; color: rgba(255,255,255,0.95);">${label}</span></div>
                     <i class="bi bi-chevron-right" style="color: rgba(255,255,255,0.3);"></i>
                   </div>
                 </div>`;
    }).join('');

    document.getElementById('modal-img').src = comp.image;
    document.getElementById('modal-title').innerText = comp.titre;
    document.getElementById('modal-ac-list').innerHTML = itemsHtml || `<div class="ac-empty-msg" style="color: rgba(255,255,255,0.6); padding: 15px; text-align: center; font-style: italic; border: 1px dashed rgba(255,255,255,0.15); border-radius: 8px;">Aucun apprentissage critique à afficher pour le moment.</div>`;

    document.getElementById('portfolio-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeCompetenceModal = function () {
    document.getElementById('portfolio-modal').classList.remove('active');
    document.body.style.overflow = '';
  };

  // Level 3: Open Reflexive Details
  window.openReflexiveModal = function (compId, acIndex) {
    const comp = COMPETENCES.find(c => c.id === compId);
    if (!comp) return;
    const ac = (comp.ac || comp.dropdownItems)[acIndex];
    if (!ac || !ac.reflexive) return;

    const r = ac.reflexive;

    document.getElementById('ref-ac-code').innerText = ac.code;
    document.getElementById('ref-ac-code').style.color = comp.color;
    document.getElementById('ref-ac-label').innerText = ac.label;

    const questions = [
      { icon: 'bi-check2-circle', title: 'Ce que j\'ai fait', text: r.fait },
      { icon: 'bi-question-circle', title: 'Pourquoi je l\'ai fait', text: r.pourquoi },
      { icon: 'bi-tools', title: 'Comment je l\'ai fait', text: r.comment },
      { icon: 'bi-exclamation-triangle', title: 'Mes difficultés', text: r.difficultes },
      { icon: 'bi-lightbulb', title: 'Ce que j\'en ai appris', text: r.appris },
      { icon: 'bi-arrow-repeat', title: 'Ce que je ferais autrement', text: r.autrement },
    ];

    document.getElementById('reflexive-grid').innerHTML = questions.map(q => `
          <div class="ref-card">
            <div class="ref-card-icon"><i class="bi ${q.icon}"></i></div>
            <h5>${q.title}</h5>
            <p>${q.text}</p>
          </div>
        `).join('');

    if (r.projet) {
      document.getElementById('reflexive-project').innerHTML = `
            <h5><i class="bi bi-paperclip"></i> Exemple de trace — projet lié</h5>
            <p>
              <strong style="color: #fff;">${r.projet.titre}</strong><br>
              <span style="color: rgba(255,255,255,0.7); font-size: 0.9rem;">${r.projet.desc}</span>
            </p>
          `;
    } else {
      document.getElementById('reflexive-project').innerHTML = '';
    }

    // Hide Level 2 modal, Show Level 3 modal
    document.getElementById('portfolio-modal').classList.remove('active');
    document.getElementById('portfolio-reflexive-modal').classList.add('active');
  };

  window.closeReflexiveModal = function () {
    document.getElementById('portfolio-reflexive-modal').classList.remove('active');
    // Re-show Level 2 modal
    document.getElementById('portfolio-modal').classList.add('active');
  };

  // Close on outside click
  document.getElementById('portfolio-modal').addEventListener('click', function (e) {
    if (e.target === this) closeCompetenceModal();
  });
  document.getElementById('portfolio-reflexive-modal').addEventListener('click', function (e) {
    if (e.target === this) {
      document.getElementById('portfolio-reflexive-modal').classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Render cards
  COMPETENCES.forEach(function (comp) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 portfolio-item';
    col.setAttribute('data-aos', 'fade-up');
    col.innerHTML =
      '<div class="portfolio-card premium-click" onclick="openCompetenceModal(\'' + comp.id + '\')">' +
      '<div class="portfolio-image-wrapper">' +
      '<img src="' + comp.image + '" alt="' + comp.titre + '" class="img-fluid">' +
      '</div>' +
      '<div class="portfolio-overlay">' +
      '<h4>' + comp.titre + '</h4>' +
      '<p>' + comp.description + '</p>' +
      '<div class="click-hint"><i class="bi bi-arrow-up-right-circle"></i> Voir les détails</div>' +
      '</div>' +
      '</div>';

    grid.appendChild(col);
  });
})();