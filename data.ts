import type { LabsData, Content } from './types';

export const content: Content = {
    en: {
        backToMenu: "Back to Menu",
        explain: "Explain Concept",
        modalTitle: "Explanation",
        copied: "Copied!",
        copy: "Copy",
        tabs: {
            overview: "Overview",
            steps: "Steps",
            implementation: "Implementation",
            testing: "Testing",
            troubleshooting: "Troubleshooting",
        },
        statuses: {
            not_started: "Not Started",
            in_progress: "In Progress",
            complete: "Complete",
        },
        callouts: {
            concept: "Concept",
            info: "Info",
            warning: "Warning",
        }
    },
    fr: {
        backToMenu: "Retour au Menu",
        explain: "Expliquer le Concept",
        modalTitle: "Explication",
        copied: "Copié !",
        copy: "Copier",
        tabs: {
            overview: "Aperçu",
            steps: "Étapes",
            implementation: "Implémentation",
            testing: "Tests",
            troubleshooting: "Dépannage",
        },
        statuses: {
            not_started: "Non Commencé",
            in_progress: "En Cours",
            complete: "Terminé",
        },
        callouts: {
            concept: "Concept",
            info: "Info",
            warning: "Avertissement",
        }
    }
};

export const labsData: LabsData = {
    "sec0": {
        section: {
            en: "Section 0: Lab Environment Setup",
            fr: "Section 0 : Mise en Place de l'Environnement"
        },
        labs: [
            {
                id: 'lab0-1',
                title: { en: '0.1 Set up your Lab Environment', fr: '0.1 Configurer votre Environnement de Laboratoire' },
                overview: {
                    objective: {
                        en: "To set up and configure the virtualized lab environment, including the Mininet VM and an external controller VM, ensuring they can communicate.",
                        fr: "Mettre en place et configurer l'environnement de laboratoire virtualisé, y compris la VM Mininet et une VM de contrôleur externe, en s'assurant qu'elles peuvent communiquer."
                    },
                    requirements: {
                        en: "A host machine with a virtualization application (VirtualBox or VMware) and the provided SDN_ENSTTIC VM images.",
                        fr: "Une machine hôte avec une application de virtualisation (VirtualBox ou VMware) et les images VM SDN_ENSTTIC fournies."
                    },
                    keyConcepts: {
                        en: "Virtualization, Bridged Networking, Host-Only Networking, Static IP Addressing.",
                        fr: "Virtualisation, Réseau par Pont, Réseau Privé Hôte, Adressage IP Statique."
                    },
                    howItWorks: {
                        en: "This lab involves importing pre-configured virtual machines and setting up their network adapters. A bridged adapter provides internet access, while a host-only adapter creates a private network between the VMs and the host machine, allowing them to communicate using static IP addresses.",
                        fr: "Ce TP implique l'importation de machines virtuelles pré-configurées et la configuration de leurs adaptateurs réseau. Un adaptateur en mode pont fournit un accès à Internet, tandis qu'un adaptateur de réseau privé hôte crée un réseau privé entre les VM et la machine hôte, leur permettant de communiquer à l'aide d'adresses IP statiques."
                    },
                    learningOutcomes: {
                        en: "You will be able to import and configure virtual machines for network simulation and establish a stable communication channel between the network emulator (Mininet) and a remote SDN controller.",
                        fr: "Vous serez capable d'importer et de configurer des machines virtuelles pour la simulation de réseau et d'établir un canal de communication stable entre l'émulateur de réseau (Mininet) et un contrôleur SDN distant."
                    },
                    realWorld: {
                        en: "Setting up isolated virtual environments is a standard practice in network engineering and software development for testing configurations and applications without affecting production systems.",
                        fr: "La mise en place d'environnements virtuels isolés est une pratique courante en ingénierie réseau et en développement logiciel pour tester des configurations et des applications sans affecter les systèmes de production."
                    }
                },
                diagram: `graph TD; subgraph "LAB Host <br> 192.168.1.100"; VBox(VirtualBox/VMware); end; VBox --> MininetVM("Mininet VM <br> 192.168.1.51"); VBox --> HPeVM("HPE Controller VM <br> 192.168.1.50");`,
                steps: [
                    { en: "<strong>Hardware & Software Requirements:</strong> Intel i5 CPU, 4GB RAM, 6GB HDD. You will need a desktop virtualization application like VMware Player or VirtualBox.", fr: "<strong>Prérequis Matériels et Logiciels :</strong> CPU Intel i5, 4Go de RAM, 6Go de HDD. Vous aurez besoin d'une application de virtualisation de bureau comme VMware Player ou VirtualBox." },
                    { en: "<strong>Download & Import:</strong> Download the provided SDN_ENSTTIC VM image (as an OVA file). Import the OVA file into your virtualization software (e.g., VirtualBox via `File > Import Appliance`).", fr: "<strong>Téléchargement & Importation :</strong> Téléchargez l'image VM SDN_ENSTTIC fournie (en tant que fichier OVA). Importez le fichier OVA dans votre logiciel de virtualisation (par ex., VirtualBox via `Fichier > Importer un appareil virtuel`)." },
                    { en: "<strong>Configure VM Network Adapters:</strong> For both the Mininet and HPE VMs, configure two network adapters. Adapter 1 should be 'Bridged' (for internet access). Adapter 2 should be 'Host-only' (for communication between VMs).", fr: "<strong>Configurer les Adaptateurs Réseau de la VM :</strong> Pour les VM Mininet et HPE, configurez deux adaptateurs réseau. L'adaptateur 1 doit être en mode 'Accès par pont' (pour l'accès à Internet). L'adaptateur 2 doit être en mode 'Réseau privé hôte' (pour la communication entre les VM)." },
                    { en: "<strong>Set Static IPs:</strong> To ensure consistent communication, assign static IP addresses to both virtual machines on the host-only network.", fr: "<strong>Définir les IP Statiques :</strong> Pour assurer une communication cohérente, attribuez des adresses IP statiques aux deux machines virtuelles sur le réseau privé hôte." },
                ],
                implementation: [
                    { en: "Configure the static IP for the Mininet VM. Access it (user: <code>mininet</code>, pass: <code>mininet</code>) and edit <code>/etc/network/interfaces</code>:", fr: "Configurez l'IP statique pour la VM Mininet. Accédez-y (user: <code>mininet</code>, pass: <code>mininet</code>) et modifiez <code>/etc/network/interfaces</code> :", code: `sudo nano /etc/network/interfaces\n\n# Add these lines for the host-only adapter (e.g., eth1)\nauto eth1\niface eth1 inet static\n    address 192.168.1.51\n    netmask 255.255.255.0`, lang: 'bash' },
                    { en: "Configure the static IP for the HPE Controller VM. Access it (user: <code>sdn</code>, pass: <code>skyline</code>) and perform a similar edit:", fr: "Configurez l'IP statique pour la VM du contrôleur HPE. Accédez-y (user: <code>sdn</code>, pass: <code>skyline</code>) et effectuez une modification similaire :", code: `sudo nano /etc/network/interfaces\n\n# Add these lines for the host-only adapter\nauto eth1\niface eth1 inet static\n    address 192.168.1.50\n    netmask 255.255.255.0`, lang: 'bash' },
                    { en: "After saving the changes, reboot both VMs with <code>sudo reboot</code>.", fr: "Après avoir enregistré les modifications, redémarrez les deux VM avec <code>sudo reboot</code>."}
                ],
                testing: [
                    { en: "From the Mininet VM, start a topology connected to the remote HPE controller:", fr: "Depuis la VM Mininet, démarrez une topologie connectée au contrôleur HPE distant :", code: `sudo mn --controller=remote,ip=192.168.1.50 --switch ovsk,protocols=OpenFlow13`, lang: 'bash' },
                    { en: "Test connectivity. If successful, the controller will discover the nodes.", fr: "Testez la connectivité. En cas de succès, le contrôleur découvrira les nœuds.", code: `mininet> pingall`, lang: 'bash' },
                    { en: "Verify the connection status from the Mininet VM's command line:", fr: "Vérifiez l'état de la connexion depuis la ligne de commande de la VM Mininet :", code: `sudo ovs-vsctl show`, lang: 'bash' }
                ],
                troubleshooting: [
                    { en: "If the VMs cannot ping each other, check the 'Host Network Manager' settings in VirtualBox (`File > Host Network Manager`) to ensure the Host-only adapter's IP is on the same subnet (e.g., 192.168.1.1).", fr: "Si les VM ne peuvent pas se pinger entre elles, vérifiez les paramètres du 'Gestionnaire de réseau hôte' dans VirtualBox (`Fichier > Gestionnaire de réseau hôte`) pour vous assurer que l'IP de l'adaptateur privé hôte est sur le même sous-réseau (par ex., 192.168.1.1)." }
                ]
            }
        ]
    },
    "sec1": {
        section: { en: "Section 1: Introduction to SDN Tools", fr: "Section 1 : Introduction aux Outils SDN" },
        labs: [
            {
                id: 'lab1-1',
                title: { en: '1.1 About Mininet', fr: '1.1 À Propos de Mininet' },
                overview: {
                    objective: {en: "Understand the purpose and key features of the Mininet network emulator.", fr: "Comprendre l'objectif et les fonctionnalités clés de l'émulateur de réseau Mininet."},
                    keyConcepts: {en: "Network Emulation, Virtual Hosts, Virtual Switches, Python API.", fr: "Émulation de Réseau, Hôtes Virtuels, Commutateurs Virtuels, API Python."},
                    howItWorks: {en: "Mininet uses Linux network namespaces to create lightweight virtual hosts and switches on a single OS kernel. This allows it to rapidly create and tear down complex network topologies for testing and development.", fr: "Mininet utilise les espaces de noms réseau de Linux pour créer des hôtes et des commutateurs virtuels légers sur un seul noyau de système d'exploitation. Cela lui permet de créer et de détruire rapidement des topologies réseau complexes pour les tests et le développement."},
                    learningOutcomes: {en: "You will understand why Mininet is a crucial tool for SDN development and be familiar with its core capabilities.", fr: "Vous comprendrez pourquoi Mininet est un outil crucial pour le développement SDN et serez familiarisé avec ses capacités de base."}
                },
                diagram: ``,
                steps: [],
                implementation: [],
                testing: [],
                troubleshooting: []
            },
            {
                id: 'lab1-2',
                title: { en: '1.2 Mininet Commands', fr: '1.2 Commandes Mininet' },
                overview: {
                    objective: {en: "Learn the basic Mininet command-line interface (CLI) commands for interacting with a virtual network.", fr: "Apprendre les commandes de base de l'interface en ligne de commande (CLI) de Mininet pour interagir avec un réseau virtuel."},
                    requirements: {en: "A running Mininet instance.", fr: "Une instance Mininet en cours d'exécution."},
                    keyConcepts: {en: "CLI Interaction, Node Inspection, Connectivity Testing.", fr: "Interaction CLI, Inspection des Nœuds, Test de Connectivité."},
                    howItWorks: {en: "The Mininet CLI provides a simple yet powerful way to manage the emulated network. Commands like `nodes`, `net`, and `pingall` allow for immediate inspection and validation of the topology.", fr: "Le CLI de Mininet offre un moyen simple mais puissant de gérer le réseau émulé. Des commandes comme `nodes`, `net` et `pingall` permettent une inspection et une validation immédiates de la topologie."},
                    learningOutcomes: {en: "You will be able to start, inspect, and test basic network topologies using the Mininet CLI.", fr: "Vous serez capable de démarrer, inspecter et tester des topologies réseau de base en utilisant le CLI de Mininet."}
                },
                diagram: ``,
                steps: [],
                implementation: [
                    { en: "Start a minimal topology:", fr: "Démarrer une topologie minimale :", code: "sudo mn", lang: "bash" },
                    { en: "Start a topology with a remote controller:", fr: "Démarrer une topologie avec un contrôleur distant :", code: "sudo mn --controller=remote,ip=[IP_ADDR],port=[PORT]", lang: "bash" },
                    { en: "Change topology size and type:", fr: "Changer la taille et le type de la topologie :", code: `sudo mn --test pingall --topo single,3\nsudo mn --test pingall --topo linear,4\nsudo mn --test pingall --topo tree,depth=2,fanout=2`, lang: "bash" }
                ],
                testing: [
                    { en: "List nodes:", fr: "Lister les nœuds :", code: "mininet> nodes", lang: "bash" },
                    { en: "Show links:", fr: "Afficher les liens :", code: "mininet> net", lang: "bash" },
                    { en: "Dump node information:", fr: "Afficher les informations des nœuds :", code: "mininet> dump", lang: "bash" },
                    { en: "Run a command on a host:", fr: "Exécuter une commande sur un hôte :", code: "mininet> h1 ifconfig", lang: "bash" },
                    { en: "Test connectivity:", fr: "Tester la connectivité :", code: "mininet> pingall", lang: "bash" }
                ],
                troubleshooting: [
                    { en: "Clean up previous Mininet instances:", fr: "Nettoyer les instances Mininet précédentes :", code: "sudo mn -c", lang: "bash" }
                ]
            },
            {
                id: 'lab1-3',
                title: { en: '1.3 Common Command Reference', fr: '1.3 Référence des Commandes Courantes' },
                overview: {
                    objective: {en: "Provide a quick reference table for the most frequently used commands in the Mininet environment.", fr: "Fournir un tableau de référence rapide pour les commandes les plus fréquemment utilisées dans l'environnement Mininet."},
                    learningOutcomes: {en: "You will have a handy reference for common Mininet and Open vSwitch commands.", fr: "Vous disposerez d'une référence pratique pour les commandes courantes de Mininet et Open vSwitch."}
                },
                diagram: ``,
                steps: [
                    {en: `
                    <table>
                        <thead>
                            <tr><th>Command</th><th>Description</th><th>Example</th></tr>
                        </thead>
                        <tbody>
                            <tr><td><code>sudo mn</code></td><td>Starts a basic Mininet topology.</td><td><code>sudo mn</code></td></tr>
                            <tr><td><code>pingall</code></td><td>Tests connectivity between all hosts.</td><td><code>mininet> pingall</code></td></tr>
                            <tr><td><code>iperf</code></td><td>Measures bandwidth between two hosts.</td><td><code>mininet> h1 iperf -s h2</code></td></tr>
                            <tr><td><code>net</code></td><td>Displays the network topology.</td><td><code>mininet> net</code></td></tr>
                            <tr><td><code>dump</code></td><td>Shows detailed information about all nodes.</td><td><code>mininet> dump</code></td></tr>
                            <tr><td><code>xterm &lt;node&gt;</code></td><td>Opens an xterm terminal for a specific node.</td><td><code>mininet> xterm h1</code></td></tr>
                            <tr><td><code>ovs-vsctl show</code></td><td>Displays detailed OVS information.</td><td><code>sh ovs-vsctl show</code></td></tr>
                            <tr><td><code>ovs-ofctl dump-flows &lt;switch&gt;</code></td><td>Lists all flow entries in a switch's flow table.</td><td><code>sh ovs-ofctl dump-flows s1</code></td></tr>
                            <tr><td><code>exit</code></td><td>Exits the Mininet CLI.</td><td><code>mininet> exit</code></td></tr>
                        </tbody>
                    </table>`,
                    fr: `
                    <table>
                        <thead>
                            <tr><th>Commande</th><th>Description</th><th>Exemple</th></tr>
                        </thead>
                        <tbody>
                            <tr><td><code>sudo mn</code></td><td>Démarre une topologie Mininet de base.</td><td><code>sudo mn</code></td></tr>
                            <tr><td><code>pingall</code></td><td>Teste la connectivité entre tous les hôtes.</td><td><code>mininet> pingall</code></td></tr>
                            <tr><td><code>iperf</code></td><td>Mesure la bande passante entre deux hôtes.</td><td><code>mininet> h1 iperf -s h2</code></td></tr>
                            <tr><td><code>net</code></td><td>Affiche la topologie du réseau.</td><td><code>mininet> net</code></td></tr>
                            <tr><td><code>dump</code></td><td>Affiche des informations détaillées sur tous les nœuds.</td><td><code>mininet> dump</code></td></tr>
                            <tr><td><code>xterm &lt;node&gt;</code></td><td>Ouvre un terminal xterm pour un nœud spécifique.</td><td><code>mininet> xterm h1</code></td></tr>
                            <tr><td><code>ovs-vsctl show</code></td><td>Affiche des informations détaillées sur OVS.</td><td><code>sh ovs-vsctl show</code></td></tr>
                            <tr><td><code>ovs-ofctl dump-flows &lt;switch&gt;</code></td><td>Liste toutes les entrées de flux dans la table de flux d'un switch.</td><td><code>sh ovs-ofctl dump-flows s1</code></td></tr>
                            <tr><td><code>exit</code></td><td>Quitte le CLI de Mininet.</td><td><code>mininet> exit</code></td></tr>
                        </tbody>
                    </table>`
                    }
                ],
                implementation: [],
                testing: [],
                troubleshooting: []
            }
        ]
    },
    "sec2": {
        section: { en: "Section 2: The Controller & Data Plane Connection", fr: "Section 2 : Connexion Contrôleur & Plan de Données" },
        labs: [
            {
                id: 'lab2-1',
                title: { en: '2.1 About Ryu Controller', fr: '2.1 À propos du contrôleur Ryu' },
                overview: {
                    objective: {en: "Understand the role and architecture of the Ryu SDN controller.", fr: "Comprendre le rôle et l'architecture du contrôleur SDN Ryu."},
                    keyConcepts: {en: "SDN Controller, Component-Based Architecture, Southbound API, OpenFlow.", fr: "Contrôleur SDN, Architecture à base de composants, API Southbound, OpenFlow."},
                    howItWorks: {en: "Ryu acts as the 'brain' of the network. It communicates with switches using the OpenFlow protocol to install flow rules and manage network behavior. Its component-based architecture allows you to write custom Python applications to define how the network should operate.", fr: "Ryu agit comme le 'cerveau' du réseau. Il communique avec les commutateurs en utilisant le protocole OpenFlow pour installer des règles de flux et gérer le comportement du réseau. Son architecture à base de composants vous permet d'écrire des applications Python personnalisées pour définir comment le réseau doit fonctionner."},
                    learningOutcomes: {en: "You will be familiar with the purpose of an SDN controller and the key features of Ryu.", fr: "Vous serez familiarisé avec le but d'un contrôleur SDN et les fonctionnalités clés de Ryu."},
                    realWorld: {en: "Controllers like Ryu are used in data centers and enterprise networks to automate network configuration, implement custom routing policies, and enhance network security.", fr: "Les contrôleurs comme Ryu sont utilisés dans les centres de données et les réseaux d'entreprise pour automatiser la configuration du réseau, mettre en œuvre des politiques de routage personnalisées et améliorer la sécurité du réseau."}
                },
                diagram: ``,
                steps: [],
                implementation: [],
                testing: [],
                troubleshooting: []
            },
            {
                id: 'lab2-2',
                title: { en: '2.2 Confirming the Testbed is Operational', fr: '2.2 Confirmation de l\'Opérationnalité du Banc d\'Essai' },
                overview: {
                   objective: {en: "Verify that the Mininet and Ryu components are installed correctly and can communicate with each other.", fr: "Vérifier que les composants Mininet et Ryu sont correctement installés et peuvent communiquer entre eux."},
                   requirements: {en: "A running SDN_ENSTTIC VM.", fr: "Une VM SDN_ENSTTIC en cours d'exécution."},
                   keyConcepts: {en: "Remote Controller, OpenFlow Protocol, Reactive Forwarding.", fr: "Contrôleur Distant, Protocole OpenFlow, Transfert Réactif."},
                   howItWorks: {en: "We start a basic Ryu application (a simple L2 switch) and then launch a Mininet topology configured to connect to this 'remote' controller. A successful `pingall` demonstrates that the switches are correctly communicating with Ryu and that Ryu is installing the necessary flow rules.", fr: "Nous démarrons une application Ryu de base (un simple commutateur L2) puis lançons une topologie Mininet configurée pour se connecter à ce contrôleur 'distant'. Un `pingall` réussi démontre que les commutateurs communiquent correctement avec Ryu et que Ryu installe les règles de flux nécessaires."},
                   learningOutcomes: {en: "You will be able to launch a Mininet topology connected to a Ryu controller and verify its operational state.", fr: "Vous serez capable de lancer une topologie Mininet connectée à un contrôleur Ryu et de vérifier son état de fonctionnement."}
                },
                diagram: `graph TD; C0(Ryu Controller) --> S1(OpenFlow Switch); S1 --> H1("h1 <br> 10.1.1.1"); S1 --> H2("h2 <br> 10.1.1.2"); S1 --> H3("h3 <br> 10.1.1.3"); S1 --> H4("h4 <br> 10.1.1.4");`,
                steps: [
                    { en: "Open two terminals. One for the Ryu controller and one for Mininet.", fr: "Ouvrez deux terminaux. Un pour le contrôleur Ryu et un pour Mininet." },
                    { en: "Run the Ryu manager for a simple switch application.", fr: "Exécutez le gestionnaire Ryu pour une application de commutateur simple." },
                    { en: "Run the Mininet network and connect it to the Ryu controller on the loopback IP address.", fr: "Exécutez le réseau Mininet et connectez-le au contrôleur Ryu sur l'adresse IP de loopback." },
                    { en: "Review the OVS configuration and flows to see the initial state.", fr: "Passez en revue la configuration et les flux OVS pour voir l'état initial." },
                    { en: "Run `pingall` in Mininet and re-dump the flows to see the influence of the Ryu controller.", fr: "Exécutez `pingall` dans Mininet et ré-affichez les flux pour voir l'influence du contrôleur Ryu." },
                ],
                implementation: [
                    { en: "Terminal 1: Start Ryu Controller", fr: "Terminal 1 : Démarrer le contrôleur Ryu", code: "ryu-manager ryu.app.simple_switch_13", lang: "bash" },
                    { en: "Terminal 2: Start Mininet", fr: "Terminal 2 : Démarrer Mininet", code: "sudo mn --controller=remote,ip=127.0.0.1 --switch ovsk,protocols=OpenFlow13 --mac --ipbase=10.1.1.0/24 --topo single,4", lang: "bash" }
                ],
                testing: [
                    { en: "Check OVS status:", fr: "Vérifier le statut OVS :", code: "sudo ovs-vsctl show", lang: "bash" },
                    { en: "Dump flows from the switch before and after pinging:", fr: "Afficher les flux du switch avant et après le ping :", code: "sudo ovs-ofctl -O OpenFlow13 dump-flows s1", lang: "bash" }
                ],
                troubleshooting: []
            },
             {
                id: 'lab2-3',
                title: { en: '2.3 Testing Ryu with Flow Manager', fr: '2.3 Tester Ryu avec Flow Manager' },
                overview: {
                    objective: {en: "Use a graphical user interface (GUI) to visualize the network topology and inspect flow rules managed by the Ryu controller.", fr: "Utiliser une interface utilisateur graphique (GUI) pour visualiser la topologie du réseau et inspecter les règles de flux gérées par le contrôleur Ryu."},
                    requirements: {en: "Completion of Lab 2.2.", fr: "Avoir terminé le TP 2.2."},
                    keyConcepts: {en: "Topology Discovery, GUI Visualization, Link Layer Discovery Protocol (LLDP).", fr: "Découverte de Topologie, Visualisation GUI, Protocole de Découverte de Couche de Liaison (LLDP)."},
                    howItWorks: {en: "By running Ryu with the `--observe-links` flag and the `flowmanager` application, the controller uses LLDP packets to discover how switches are interconnected. The Flow Manager GUI then uses this information to draw a real-time map of the network.", fr: "En exécutant Ryu avec l'indicateur `--observe-links` et l'application `flowmanager`, le contrôleur utilise des paquets LLDP pour découvrir comment les commutateurs sont interconnectés. L'interface graphique de Flow Manager utilise ensuite ces informations pour dessiner une carte en temps réel du réseau."},
                    learningOutcomes: {en: "You will be able to launch Ryu with multiple applications and use a GUI to monitor an SDN network.", fr: "Vous serez capable de lancer Ryu avec plusieurs applications et d'utiliser une interface graphique pour surveiller un réseau SDN."}
                },
                diagram: `graph TD; C(Ryu Controller); subgraph "Tree Topology (depth=2, fanout=2)"; S1 --- S2 & S3; end; subgraph "Hosts"; S2 --> H1("h1"); S2 --> H2("h2"); S3 --> H3("h3"); S3 --> H4("h4"); end; C -.-> S1;`,
                steps: [
                    { en: "<strong>Running with Flow Manager:</strong> Use Flow Manager to get a graphical view of your network topology and the flow entries on each switch.", fr: "<strong>Exécution avec Flow Manager :</strong> Utilisez Flow Manager pour obtenir une vue graphique de votre topologie réseau et des entrées de flux sur chaque commutateur." },
                    { en: "<strong>Confirming Operation:</strong> We will run Ryu and Mininet in separate terminals, then use `ovs-ofctl` to inspect the flow tables before and after generating traffic to see the controller's reactive rules in action.", fr: "<strong>Confirmation de l'Opérationnalité :</strong> Nous exécuterons Ryu et Mininet dans des terminaux séparés, puis utiliserons `ovs-ofctl` pour inspecter les tables de flux avant et après la génération de trafic pour voir les règles réactives du contrôleur en action." }
                ],
                implementation: [
                    {en: "The command below is more powerful than a basic `ryu-manager` call because it loads multiple applications that work together: <ul><li><code>--observe-links</code>: This flag activates Ryu's topology discovery module, which is necessary for Flow Manager to map the network.</li><li><code>~/flowmanager/flowmanager.py</code>: This is the Flow Manager application itself, providing the web GUI.</li><li><code>ryu.app.simple_switch_13</code>: This is the core L2 switching logic. Flow Manager will visualize the flows created by this application.</li></ul>", fr: "La commande ci-dessous est plus puissante qu'un simple appel `ryu-manager` car elle charge plusieurs applications qui fonctionnent ensemble :<ul><li><code>--observe-links</code>: Cet indicateur active le module de découverte de topologie de Ryu, nécessaire pour que Flow Manager puisse cartographier le réseau.</li><li><code>~/flowmanager/flowmanager.py</code>: C'est l'application Flow Manager elle-même, qui fournit l'interface graphique web.</li><li><code>ryu.app.simple_switch_13</code>: C'est la logique de commutation L2 de base. Flow Manager visualisera les flux créés par cette application.</li></ul>"},
                    { en: "To run Ryu with the Flow Manager GUI (ensure it's installed in `~/flowmanager`):", fr: "Pour exécuter Ryu avec l'interface graphique Flow Manager (assurez-vous qu'il est installé dans `~/flowmanager`) :", code: "ryu-manager --observe-links ~/flowmanager/flowmanager.py ryu.app.simple_switch_13", lang: "bash" },
                    { en: "In a second terminal, connect a tree topology to the Ryu controller:", fr: "Dans un second terminal, connectez une topologie en arbre au contrôleur Ryu :", code: "sudo mn --topo tree,depth=2,fanout=2 --switch ovsk --controller=remote,ip=127.0.0.1,port=6653 --mac", lang: "bash" }
                ],
                testing: [
                    { en: "After starting both, you can access the Flow Manager web interface (usually at http://127.0.0.1:8080) to see the topology.", fr: "Après avoir démarré les deux, vous pouvez accéder à l'interface web de Flow Manager (généralement à http://127.0.0.1:8080) pour voir la topologie." },
                    { en: "In the Mininet CLI, generate traffic:", fr: "Dans le CLI de Mininet, générez du trafic :", code: "mininet> pingall", lang: "bash" },
                    { en: "In a third terminal, dump the flows from a switch to see the reactive rules added by Ryu:", fr: "Dans un troisième terminal, affichez les flux d'un commutateur pour voir les règles réactives ajoutées par Ryu :", code: "sudo ovs-ofctl -O OpenFlow13 dump-flows s1", lang: "bash" }
                ],
                troubleshooting: [
                    {en: "If Flow Manager doesn't show the topology, make sure you used the `--observe-links` flag when starting `ryu-manager`.", fr: "Si Flow Manager n'affiche pas la topologie, assurez-vous d'avoir utilisé l'indicateur `--observe-links` lors du démarrage de `ryu-manager`."}
                ]
            },
            {
                id: 'lab2-4',
                title: { en: '2.4 OpenFlow Connection Handshake', fr: '2.4 Handshake de Connexion OpenFlow' },
                overview: {
                    objective: {en: "Observe and understand the initial message exchange between an OpenFlow switch and an SDN controller.", fr: "Observer et comprendre l'échange de messages initial entre un commutateur OpenFlow et un contrôleur SDN."},
                    requirements: {en: "Wireshark and a running Mininet/Ryu environment.", fr: "Wireshark et un environnement Mininet/Ryu fonctionnel."},
                    keyConcepts: {en: "OpenFlow Handshake, HELLO message, FEATURES_REQUEST/REPLY, PACKET_IN, PACKET_OUT, FLOW_MOD.", fr: "Handshake OpenFlow, message HELLO, FEATURES_REQUEST/REPLY, PACKET_IN, PACKET_OUT, FLOW_MOD."},
                    howItWorks: {en: "When a switch connects to a controller, they perform a handshake to negotiate the protocol version and exchange capabilities. This lab uses Wireshark to capture and analyze this critical setup communication, as well as the reactive messages that follow when traffic is generated.", fr: "Lorsqu'un commutateur se connecte à un contrôleur, ils effectuent un handshake pour négocier la version du protocole et échanger leurs capacités. Ce TP utilise Wireshark pour capturer et analyser cette communication de configuration critique, ainsi que les messages réactifs qui suivent lorsque du trafic est généré."},
                    learningOutcomes: {en: "You will be able to identify and explain the purpose of the fundamental OpenFlow messages used to establish control and handle network traffic.", fr: "Vous serez capable d'identifier et d'expliquer le but des messages OpenFlow fondamentaux utilisés pour établir le contrôle et gérer le trafic réseau."}
                },
                diagram: `sequenceDiagram; participant S1 as Switch; participant C as Ryu Controller; S1->>C: HELLO; C-->>S1: HELLO; C->>S1: FEATURES_REQUEST; S1-->>C: FEATURES_REPLY; C->>S1: SET_CONFIG; S1-->>C: SET_CONFIG_REPLY;`,
                steps: [
                    {en: "Start Wireshark and begin capturing on the loopback interface (`lo`), as both Mininet and Ryu are running locally.", fr: "Démarrez Wireshark et commencez à capturer sur l'interface de loopback (`lo`), car Mininet and Ryu s'exécutent tous deux localement."},
                    {en: "Start the Ryu controller in one terminal.", fr: "Démarrez le contrôleur Ryu dans un terminal."},
                    {en: "Start a simple Mininet topology in another terminal.", fr: "Démarrez une topologie Mininet simple dans un autre terminal."},
                    {en: "Stop the capture and inspect the packets in Wireshark.", fr: "Arrêtez la capture et inspectez les paquets dans Wireshark."}
                ],
                implementation: [
                    {en: "Start Wireshark from the Mininet CLI or a new terminal:", fr: "Démarrez Wireshark depuis le CLI de Mininet ou un nouveau terminal :", code: "wireshark &", lang: "bash"},
                    {en: "Start Ryu:", fr: "Démarrez Ryu :", code: "ryu-manager ryu.app.simple_switch_13", lang: "bash"},
                    {en: "Start Mininet:", fr: "Démarrez Mininet :", code: "sudo mn --controller=remote,ip=127.0.0.1 --topo single,1", lang: "bash"}
                ],
                testing: [
                    {en: "In Wireshark, apply the filter <code>openflow_v4</code>.", fr: "Dans Wireshark, appliquez le filtre <code>openflow_v4</code>."},
                    {en: "Observe the key packets: HELLO (to negotiate version), FEATURES_REQUEST (controller asks about switch capabilities), and FEATURES_REPLY (switch responds with its datapath ID, buffer count, etc.).", fr: "Observez les paquets clés : HELLO (pour négocier la version), FEATURES_REQUEST (le contrôleur demande les capacités du switch), et FEATURES_REPLY (le switch répond avec son datapath ID, son nombre de tampons, etc.)."},
                    {en: "<strong>PACKET_IN Messages:</strong> After the handshake, if you generate traffic (e.g., `pingall`), you will see these messages. A switch sends a `PACKET_IN` to the controller when it receives a packet that doesn't match any entry in its flow table. It's asking the controller for instructions.", fr: "<strong>Messages PACKET_IN :</strong> Après le handshake, si vous générez du trafic (par ex., `pingall`), vous verrez ces messages. Un commutateur envoie un `PACKET_IN` au contrôleur lorsqu'il reçoit un paquet qui ne correspond à aucune entrée de sa table de flux. Il demande des instructions au contrôleur."},
                    {en: "<strong>PACKET_OUT Messages:</strong> In response to a `PACKET_IN`, the controller sends a `PACKET_OUT` message. This tells the switch exactly what to do with the packet it just received, such as forwarding it to a specific port or flooding it.", fr: "<strong>Messages PACKET_OUT :</strong> En réponse à un `PACKET_IN`, le contrôleur envoie un message `PACKET_OUT`. Celui-ci indique exactement au commutateur quoi faire avec le paquet qu'il vient de recevoir, comme le transférer vers un port spécifique ou l'inonder."},
                    {en: "<strong>FLOW_MOD Messages:</strong> Along with a `PACKET_OUT`, the controller will usually send a `FLOW_MOD` (Flow Modification) message. This instructs the switch to install a new flow rule so that future packets of the same type can be processed directly by the switch without needing to contact the controller again.", fr: "<strong>Messages FLOW_MOD :</strong> En plus d'un `PACKET_OUT`, le contrôleur enverra généralement un message `FLOW_MOD` (Modification de Flux). Celui-ci ordonne au commutateur d'installer une nouvelle règle de flux afin que les futurs paquets du même type puissent être traités directement par le commutateur sans avoir à contacter à nouveau le contrôleur."}
                ],
                troubleshooting: []
            }
        ]
    },
    "sec3": {
        section: { en: "Section 3: Open vSwitch Deep Dive", fr: "Section 3 : Plongée dans Open vSwitch" },
        labs: [
            {
                id: 'lab3-1',
                title: { en: '3.1 Introduction to OvS Commands', fr: '3.1 Introduction aux commandes OvS' },
                overview: {
                    objective: {
                        en: `Before manipulating flows, it's essential to understand the basic commands for inspecting Open vSwitch. This lab covers <code>ovs-vsctl</code> for managing the switch configuration and <code>ovs-ofctl</code> for interacting with the OpenFlow protocol logic.`,
                        fr: `Avant de manipuler les flux, il est essentiel de comprendre les commandes de base pour inspecter Open vSwitch. Ce TP couvre <code>ovs-vsctl</code> pour la gestion de la configuration du switch et <code>ovs-ofctl</code> pour interagir avec la logique du protocole OpenFlow.`
                    }
                },
                diagram: `graph TD; User -- "ovs-vsctl" --> OvS_DB(OvS Database); User -- "ovs-ofctl" --> OpenFlow(Flow Tables);`,
                steps: [
                    {en: "Start a simple Mininet topology, preferably without a controller, so we can inspect its default state.", fr: "Démarrez une topologie Mininet simple, de préférence sans contrôleur, afin que nous puissions inspecter son état par défaut."},
                    {en: "Use <code>ovs-vsctl show</code> to see the overall status of the OvS instance, including bridges, ports, and controller connections.", fr: "Utilisez <code>ovs-vsctl show</code> pour voir l'état général de l'instance OvS, y compris les ponts, les ports et les connexions au contrôleur."},
                    {en: "Use <code>ovs-ofctl dump-ports</code> to list the OpenFlow port numbers for a specific bridge. These numbers are used in flow rules.", fr: "Utilisez <code>ovs-ofctl dump-ports</code> pour lister les numéros de port OpenFlow pour un pont spécifique. Ces numéros sont utilisés dans les règles de flux."},
                    {en: "Use <code>ovs-ofctl dump-flows</code> to see the current set of flow rules on the switch.", fr: "Utilisez <code>ovs-ofctl dump-flows</code> pour voir l'ensemble actuel des règles de flux sur le switch."}
                ],
                implementation: [
                    {en: "Start Mininet:", fr: "Démarrez Mininet :", code: "sudo mn --topo single,2 --controller=none", lang: "bash"},
                    {en: "Show OvS status:", fr: "Afficher le statut d'OvS :", code: "mininet> sh ovs-vsctl show", lang: "bash"},
                    {en: "Show OpenFlow port numbers for switch s1:", fr: "Afficher les numéros de port OpenFlow pour le switch s1 :", code: "mininet> sh ovs-ofctl dump-ports s1", lang: "bash"},
                    {en: "Show flow table for switch s1:", fr: "Afficher la table de flux pour le switch s1 :", code: "mininet> sh ovs-ofctl dump-flows s1", lang: "bash"}
                ],
                testing: [],
                troubleshooting: []
            },
            {
                id: 'lab3-2',
                title: { en: '3.2 Manual Flow Installation (Layer 2)', fr: '3.2 Installation Manuelle de Flux (Couche 2)' },
                overview: {
                    objective: {
                        en: `This lab focuses on manually programming a switch to forward traffic based on Layer 2 (Ethernet) information. We will add flows that match source and destination MAC addresses to enable communication between two hosts without a controller.`,
                        fr: `Ce TP se concentre sur la programmation manuelle d'un commutateur pour transférer du trafic en se basant sur des informations de Couche 2 (Ethernet). Nous ajouterons des flux qui correspondent aux adresses MAC source et destination pour permettre la communication entre deux hôtes sans contrôleur.`
                    }
                },
                diagram: `graph TD; S1; H1("h1 <br> 00:..:01"); H2("h2 <br> 00:..:02"); S1 -- "port 1" --> H1; S1 -- "port 2" --> H2;`,
                steps: [
                    {en: "Start a topology with no controller and use the `--mac` option to make MAC addresses predictable.", fr: "Démarrez une topologie sans contrôleur et utilisez l'option `--mac` pour rendre les adresses MAC prévisibles."},
                    {en: "Because there's no controller to handle ARP, add a rule to flood all ARP packets so hosts can discover each other's MAC addresses.", fr: "Comme il n'y a pas de contrôleur pour gérer l'ARP, ajoutez une règle pour inonder tous les paquets ARP afin que les hôtes puissent découvrir les adresses MAC des autres."},
                    {en: "Add a flow rule to forward traffic from h1 to h2, matching on h1's MAC as the source and h2's as the destination, with an action to output to h2's port.", fr: "Ajoutez une règle de flux pour transférer le trafic de h1 à h2, en faisant correspondre la MAC de h1 comme source et celle de h2 comme destination, avec une action de sortie vers le port de h2."},
                    {en: "Add a second, symmetrical rule for traffic from h2 to h1.", fr: "Ajoutez une seconde règle symétrique pour le trafic de h2 à h1."}
                ],
                implementation: [
                    {en: "Start Mininet:", fr: "Démarrez Mininet :", code: "sudo mn --topo single,3 --controller=none --mac", lang: "bash"},
                    {en: "Add ARP flood rule:", fr: "Ajoutez la règle d'inondation ARP :", code: `mininet> sh ovs-ofctl add-flow s1 "dl_type=0x0806,actions=flood"`, lang: "bash"},
                    {en: "Add bidirectional L2 flows for h1 and h2:", fr: "Ajoutez des flux L2 bidirectionnels pour h1 et h2 :", code: `mininet> sh ovs-ofctl add-flow s1 "dl_src=00:00:00:00:00:01,dl_dst=00:00:00:00:00:02,actions=output:2"\nmininet> sh ovs-ofctl add-flow s1 "dl_src=00:00:00:00:00:02,dl_dst=00:00:00:00:00:01,actions=output:1"`, lang: "bash"},
                ],
                testing: [
                    {en: "A ping between h1 and h2 should now succeed.", fr: "Un ping entre h1 et h2 devrait maintenant réussir."},
                    {en: "A ping from h1 to h3 will fail, as no flow rules exist for this path.", fr: "Un ping de h1 à h3 échouera, car aucune règle de flux n'existe pour ce chemin."}
                ],
                troubleshooting: []
            },
            {
                id: 'lab3-3',
                title: { en: '3.3 Advanced Matching (Layer 3)', fr: '3.3 Correspondance Avancée (Couche 3)' },
                overview: {
                    objective: {
                        en: `Extend flow rules to match on Layer 3 information. By matching on IP addresses, the switch can make routing decisions without needing to know the MAC addresses, demonstrating a more powerful form of traffic control.`,
                        fr: `Étendez les règles de flux pour correspondre aux informations de Couche 3. En faisant correspondre les adresses IP, le commutateur peut prendre des décisions de routage sans avoir besoin de connaître les adresses MAC, ce qui démontre une forme plus puissante de contrôle du trafic.`
                    }
                },
                diagram: `graph TD; S1; H1("h1 <br> 10.0.0.1"); H2("h2 <br> 10.0.0.2"); S1 -- "port 1" --> H1; S1 -- "port 2" --> H2;`,
                steps: [
                    {en: "Clear all existing flows from the switch.", fr: "Effacez tous les flux existants du commutateur."},
                    {en: "Add specific flow rules for ARP traffic, directing ARP replies for each host to the correct output port.", fr: "Ajoutez des règles de flux spécifiques pour le trafic ARP, dirigeant les réponses ARP pour chaque hôte vers le port de sortie correct."},
                    {en: "Add a general rule that forwards any IP traffic within the 10.0.0.0/24 subnet using the `NORMAL` action, which tells the switch to behave like a traditional L2 switch for that traffic.", fr: "Ajoutez une règle générale qui transfère tout trafic IP au sein du sous-réseau 10.0.0.0/24 en utilisant l'action `NORMAL`, ce qui indique au commutateur de se comporter comme un commutateur L2 traditionnel pour ce trafic."}
                ],
                implementation: [
                    {en: "Clear flows:", fr: "Effacer les flux :", code: "mininet> sh ovs-ofctl del-flows s1", lang: "bash"},
                    {en: "Add IP-based flows:", fr: "Ajoutez des flux basés sur l'IP :", code: `mininet> sh ovs-ofctl add-flow s1 "arp,nw_dst=10.0.0.1,actions=output:1"\nmininet> sh ovs-ofctl add-flow s1 "arp,nw_dst=10.0.0.2,actions=output:2"\nmininet> sh ovs-ofctl add-flow s1 "ip,nw_dst=10.0.0.1,actions=output:1"\nmininet> sh ovs-ofctl add-flow s1 "ip,nw_dst=10.0.0.2,actions=output:2"`, lang: "bash"}
                ],
                testing: [
                    {en: "Test connectivity between h1 and h2. It should succeed.", fr: "Testez la connectivité entre h1 et h2. Elle devrait réussir.", code: "mininet> h1 ping h2", lang: "bash"}
                ],
                troubleshooting: []
            },
            {
                id: 'lab3-4',
                title: { en: '3.4 Advanced Matching (Layer 4)', fr: '3.4 Correspondance Avancée (Couche 4)' },
                overview: {
                    objective: {
                        en: `Achieve application-aware traffic control by creating flow rules that match on Layer 4 (Transport) information, such as TCP/UDP protocols and port numbers. This allows the switch to differentiate between different types of services (e.g., web vs. video streaming).`,
                        fr: `Obtenez un contrôle du trafic sensible aux applications en créant des règles de flux qui correspondent aux informations de Couche 4 (Transport), telles que les protocoles TCP/UDP et les numéros de port. Cela permet au commutateur de différencier les différents types de services (par ex., web vs streaming vidéo).`
                    }
                },
                diagram: `graph TD; S1; H1("h1"); H2("h2"); S1 --> H1; S1 --> H2;`,
                steps: [
                    {en: "Start a server on one host and a client on another. For example, use `iperf` to generate TCP traffic on a specific port (default is 5001).", fr: "Démarrez un serveur sur un hôte et un client sur un autre. Par exemple, utilisez `iperf` pour générer du trafic TCP sur un port spécifique (la valeur par défaut est 5001)."},
                    {en: "Add a flow rule that specifically drops TCP traffic destined for that port.", fr: "Ajoutez une règle de flux qui rejette spécifiquement le trafic TCP destiné à ce port."},
                    {en: "Add a lower-priority rule that allows all other IP traffic.", fr: "Ajoutez une règle de priorité inférieure qui autorise tout autre trafic IP."}
                ],
                implementation: [
                    {en: "Drop TCP traffic on port 5001:", fr: "Rejeter le trafic TCP sur le port 5001 :", code: `mininet> sh ovs-ofctl add-flow s1 "priority=200,tcp,tp_dst=5001,actions=drop"`, lang: "bash"},
                    {en: "Allow all other IP traffic:", fr: "Autoriser tout autre trafic IP :", code: `mininet> sh ovs-ofctl add-flow s1 "priority=100,ip,actions=normal"`, lang: "bash"}
                ],
                testing: [
                    {en: "Run an `iperf` test between h1 and h2. It should fail because the traffic is dropped.", fr: "Exécutez un test `iperf` entre h1 et h2. Il devrait échouer car le trafic est rejeté."},
                    {en: "Run a `ping` between h1 and h2. It should succeed because ICMP traffic is not matched by the drop rule and falls through to the 'allow' rule.", fr: "Exécutez un `ping` entre h1 et h2. Il devrait réussir car le trafic ICMP n'est pas intercepté par la règle de rejet et passe à la règle 'allow'."}
                ],
                troubleshooting: []
            },
            {
                id: 'lab3-5',
                title: { en: '3.5 Flow Priorities and Timeouts', fr: '3.5 Priorités et Timeouts des Flux' },
                overview: {
                    objective: {
                        en: `This lab demonstrates how a switch resolves conflicting flow rules using priorities and how to manage the lifecycle of flow entries using timeouts. A higher priority number means the rule is checked first.`,
                        fr: `Ce TP montre comment un commutateur résout les conflits de règles de flux en utilisant les priorités et comment gérer le cycle de vie des entrées de flux en utilisant des timeouts. Un numéro de priorité plus élevé signifie que la règle est vérifiée en premier.`
                    }
                },
                diagram: `graph TD; A[Flow Rule Installed] -- After 30s --> B(Rule Deleted); C[Flow Rule Installed] -- No traffic for 15s --> D(Rule Deleted);`,
                steps: [
                    {en: "Add a high-priority flow rule with a `hard_timeout`. The rule will be active for the specified duration and then automatically removed.", fr: "Ajoutez une règle de flux de haute priorité avec un `hard_timeout`. La règle sera active pendant la durée spécifiée puis automatiquement supprimée."},
                    {en: "Add another flow rule with an `idle_timeout`. Send traffic to keep it alive, then stop the traffic and observe that the rule is removed after the idle period.", fr: "Ajoutez une autre règle de flux avec un `idle_timeout`. Envoyez du trafic pour la maintenir en vie, puis arrêtez le trafic et observez que la règle est supprimée après la période d'inactivité."}
                ],
                implementation: [
                    {en: "Add a high-priority drop rule with a 10-second hard timeout:", fr: "Ajoutez une règle de rejet de haute priorité avec un hard timeout de 10 secondes :", code: `mininet> sh ovs-ofctl -O OpenFlow13 add-flow s1 "priority=100,hard_timeout=10,actions=drop"`, lang: "bash"},
                    {en: "Add a lower-priority allow rule:", fr: "Ajoutez une règle d'autorisation de priorité inférieure :", code: `mininet> sh ovs-ofctl -O OpenFlow13 add-flow s1 "priority=50,actions=normal"`, lang: "bash"}
                ],
                testing: [
                    {en: "For the hard timeout, `pingall` will fail for 10 seconds because the 'drop' rule has higher priority. After 10 seconds, it will succeed as only the 'normal' rule remains.", fr: "Pour le hard timeout, `pingall` échouera pendant 10 secondes car la règle 'drop' a une priorité plus élevée. Après 10 secondes, il réussira car seule la règle 'normal' subsiste."},
                ],
                troubleshooting: []
            },
        ]
    },
    "sec4": {
        section: { en: "Section 4: OpenFlow Fundamentals", fr: "Section 4 : Fondamentaux d'OpenFlow" },
        labs: [
             {
                id: 'lab4-1',
                title: { en: '4.1 Flow Table Demo', fr: '4.1 Démo de la Table de Flux' },
                overview: {
                    objective: {
                        en: `This demo illustrates how to inspect the flow table of an OpenFlow switch. The content here is similar to what a controller would install. For a deeper dive into manual flow installation, see the labs in the <strong>Open vSwitch Deep Dive</strong> section.`,
                        fr: `Cette démo illustre comment inspecter la table de flux d'un commutateur OpenFlow. Le contenu ici est similaire à ce qu'un contrôleur installerait. Pour une exploration plus approfondie de l'installation manuelle de flux, consultez les TPs de la section <strong>Plongée dans Open vSwitch</strong>.`
                    }
                },
                diagram: `graph TD; C(Controller) -- "manages" --> S1 & S2; S1 --- S2; S1 --> H1("h1 <br> 10.0.0.1"); S2 --> H2("h2 <br> 10.0.0.2");`,
                steps: [],
                implementation: [],
                testing: [],
                troubleshooting: []
            },
            {
                id: 'lab4-2',
                title: { en: '4.2 Flow Installation: Reactive vs. Proactive', fr: '4.2 Installation de Flux : Réactif vs Proactif' },
                overview: {
                    objective: {
                        en: `This lab demonstrates the two primary modes of flow installation in SDN. <strong>Reactive:</strong> The controller installs flow rules only after a new, unknown packet arrives at a switch. <strong>Proactive:</strong> Flow rules are pre-populated in the switch's flow table by the controller or an administrator. For a detailed breakdown of the messages involved in the reactive process (PACKET_IN, etc.), please refer to <strong>Lab 2.4: OpenFlow Connection Handshake</strong>. For hands-on proactive examples, see the <strong>Open vSwitch Deep Dive</strong> section.`,
                        fr: `Ce TP démontre les deux modes principaux d'installation de flux en SDN. <strong>Réactif :</strong> Le contrôleur n'installe les règles de flux qu'après l'arrivée d'un nouveau paquet inconnu sur un commutateur. <strong>Proactif :</strong> Les règles de flux sont pré-chargées dans la table de flux du commutateur par le contrôleur ou un administrateur. Pour une description détaillée des messages impliqués dans le processus réactif (PACKET_IN, etc.), veuillez vous référer au <strong>TP 2.4 : Handshake de Connexion OpenFlow</strong>. Pour des exemples pratiques proactifs, consultez la section <strong>Plongée dans Open vSwitch</strong>.`
                    }
                },
                diagram: ``,
                steps: [],
                implementation: [],
                testing: [],
                troubleshooting: []
            }
        ]
    },
    "sec5": {
        section: { en: "Section 5: Custom Network Topologies", fr: "Section 5 : Création de Topologies Personnalisées" },
        labs: [
            {
                id: 'lab5-1',
                title: { en: '5.1 Topology with MiniEdit', fr: '5.1 Topologie avec MiniEdit' },
                overview: {
                    objective: {
                        en: `Use the MiniEdit graphical user interface to visually create a simple network, run it, and export it as a reusable Python script.`,
                        fr: `Utilisez l'interface graphique MiniEdit pour créer visuellement un réseau simple, l'exécuter et l'exporter en tant que script Python réutilisable.`
                    }
                },
                diagram: `graph TD; M(MiniEdit GUI) -- Export --> P(Python Script); P -- Run --> N(Mininet Network);`,
                steps: [
                    { en: "Launch MiniEdit from the command line.", fr: "Lancez MiniEdit depuis la ligne de commande." },
                    { en: "Build the Topology: Use the graphical tools to add hosts, switches, and a controller. Connect them using the link tool.", fr: "Construisez la topologie : Utilisez les outils graphiques pour ajouter des hôtes, des switches et un contrôleur. Connectez-les avec l'outil de liaison." },
                    { en: "Run the topology directly from the GUI to test it.", fr: "Exécutez la topologie directement depuis l'interface graphique pour la tester." },
                    { en: "Export the topology to a Python script via `File -> Export -> Level 2 Script`.", fr: "Exportez la topologie vers un script Python via `Fichier -> Exporter -> Script Niveau 2`." }
                ],
                implementation: [
                    { en: "Find the path to `miniedit.py` in your Mininet examples folder and run it:", fr: "Trouvez le chemin vers `miniedit.py` dans votre dossier d'exemples Mininet et exécutez-le :", code: `sudo python /path/to/mininet/examples/miniedit.py`, lang: 'bash' }
                ],
                testing: [
                    { en: "After running the topology, use the `pingall` command in the spawned Mininet CLI to verify connectivity.", fr: "Après avoir exécuté la topologie, utilisez la commande `pingall` dans le CLI Mininet pour vérifier la connectivité." }
                ],
                troubleshooting: []
            },
            {
                id: 'lab5-2',
                title: { en: '5.2 Script: myFirstTopo.py', fr: '5.2 Script : myFirstTopo.py' },
                overview: {
                    objective: {
                        en: `Write a Python script from scratch to build a custom topology with two switches and four hosts.`,
                        fr: `Écrivez un script Python à partir de zéro pour construire une topologie personnalisée avec deux commutateurs et quatre hôtes.`
                    }
                },
                diagram: `graph TD; S1 --- S2; S1 --> H1("h1 <br> 10.0.0.1"); S1 --> H2("h2 <br> 10.0.0.2"); S2 --> H3("h3 <br> 10.0.0.3"); S2 --> H4("h4 <br> 10.0.0.4");`,
                steps: [
                    { en: "Create a new Python file named `myFirstTopo.py`.", fr: "Créez un nouveau fichier Python nommé `myFirstTopo.py`." },
                    { en: "Import the necessary classes from the Mininet library.", fr: "Importez les classes nécessaires de la bibliothèque Mininet." },
                    { en: "Define a custom topology class that inherits from `mininet.topo.Topo`.", fr: "Définissez une classe de topologie personnalisée qui hérite de `mininet.topo.Topo`." },
                    { en: "In the `__init__` method, add hosts, switches, and links to define your network structure.", fr: "Dans la méthode `__init__`, ajoutez des hôtes, des commutateurs et des liens pour définir la structure de votre réseau." },
                ],
                implementation: [
                    { en: "Full script for `myFirstTopo.py`:", fr: "Script complet pour `myFirstTopo.py` :", code: `#!/usr/bin/python
from mininet.topo import Topo
from mininet.net import Mininet
from mininet.util import dumpNodeConnections
from mininet.log import setLogLevel

class MyFirstTopo(Topo):
    def __init__(self):
        Topo.__init__(self)
        h1 = self.addHost('h1')
        h2 = self.addHost('h2')
        h3 = self.addHost('h3')
        h4 = self.addHost('h4')
        leftSwitch = self.addSwitch('s1')
        rightSwitch = self.addSwitch('s2')
        self.addLink(h1, leftSwitch)
        self.addLink(h2, leftSwitch)
        self.addLink(leftSwitch, rightSwitch)
        self.addLink(rightSwitch, h3)
        self.addLink(rightSwitch, h4)

def runExperiment():
    topo = MyFirstTopo()
    net = Mininet(topo)
    net.start()
    dumpNodeConnections(net.hosts)
    net.pingAll()
    net.stop()

if __name__ == '__main__':
    setLogLevel('info')
    runExperiment()`, lang: 'python' }
                ],
                testing: [
                    { en: "Run your custom topology script:", fr: "Exécutez votre script de topologie personnalisé :", code: `sudo python myFirstTopo.py`, lang: 'bash' }
                ],
                troubleshooting: []
            },
            {
                id: 'lab5-3',
                title: { en: '5.3 Python API Topology Creation', fr: '5.3 Création de Topologie via l\'API Python' },
                overview: {
                    objective: {
                        en: `The Mininet Python API allows for programmatic creation of complex and parameterized topologies. It is structured into three main levels: <ul><li><strong>Low-level API:</strong> Directly instantiate base classes like <code>Host</code> and <code>Switch</code>.</li><li><strong>Mid-level API:</strong> Use the main <code>Mininet</code> class methods like <code>addHost()</code> and <code>addSwitch()</code>.</li><li><strong>High-level API:</strong> Use the <code>Topo</code> class to create reusable, parameterized topology templates that can be easily shared and run from the command line. This lab focuses on the High-level API.</li></ul>`,
                        fr: `L'API Python de Mininet permet la création programmatique de topologies complexes et paramétrées. Elle est structurée en trois niveaux principaux : <ul><li><strong>API de bas niveau :</strong> Instancier directement des classes de base comme <code>Host</code> et <code>Switch</code>.</li><li><strong>API de niveau intermédiaire :</strong> Utiliser les méthodes de la classe principale <code>Mininet</code> comme <code>addHost()</code> et <code>addSwitch()</code>.</li><li><strong>API de haut niveau :</strong> Utiliser la classe <code>Topo</code> pour créer des modèles de topologie réutilisables et paramétrés qui peuvent être facilement partagés et exécutés depuis la ligne de commande. Ce TP se concentre sur l'API de haut niveau.</li></ul>`
                    }
                },
                diagram: `graph TD; S1 --- S2; S1 --> H1("h1 <br> 10.0.0.1"); S1 --> H2("h2 <br> 10.0.0.2"); S2 --> H3("h3 <br> 10.0.0.3"); S2 --> H4("h4 <br> 10.0.0.4");`,
                steps: [
                    {en: "Create a Python script that defines a class inheriting from Mininet's `Topo` class.", fr: "Créez un script Python qui définit une classe héritant de la classe `Topo` de Mininet."},
                    {en: "Within the class, use methods like `self.addHost()` and `self.addSwitch()` to define the network nodes.", fr: "À l'intérieur de la classe, utilisez des méthodes comme `self.addHost()` et `self.addSwitch()` pour définir les nœuds du réseau."},
                    {en: "Use `self.addLink()` to connect the nodes together.", fr: "Utilisez `self.addLink()` pour connecter les nœuds entre eux."}
                ],
                implementation: [
                    {en: "This extended script not only defines the topology but also includes a main execution block to start the network, test connectivity, and then stop it.", fr: "Ce script étendu ne définit pas seulement la topologie, mais inclut également un bloc d'exécution principal pour démarrer le réseau, tester la connectivité, puis l'arrêter.", code: `#!/usr/bin/python
from mininet.topo import Topo
from mininet.net import Mininet
from mininet.util import dumpNodeConnections
from mininet.log import setLogLevel

class MyFirstTopo(Topo):
    "Simple topology example."
    def __init__(self):
        "Create custom topo."
        # Initialize topology
        Topo.__init__(self)
        # Add hosts and switches
        h1 = self.addHost('h1')
        h2 = self.addHost('h2')
        h3 = self.addHost('h3')
        h4 = self.addHost('h4')
        leftSwitch = self.addSwitch('s1')
        rightSwitch = self.addSwitch('s2')
        # Add links
        self.addLink(h1, leftSwitch)
        self.addLink(h2, leftSwitch)
        self.addLink(leftSwitch, rightSwitch)
        self.addLink(rightSwitch, h3)
        self.addLink(rightSwitch, h4)

def runExperiment():
    "Create and test a simple experiment"
    topo = MyFirstTopo()
    net = Mininet(topo)
    net.start()
    print("Dumping host connections")
    dumpNodeConnections(net.hosts)
    print("Testing network connectivity")
    net.pingAll()
    net.stop()

if __name__ == '__main__':
    # Tell mininet to print useful information
    setLogLevel('info')
    runExperiment()`, lang: "python"}
                ],
                testing: [
                    {en: "You can run this script directly using Python:", fr: "Vous pouvez exécuter ce script directement avec Python :", code: "sudo python your_script_name.py", lang: "bash"},
                    {en: "Alternatively, you can load the topology into the Mininet CLI using the `--custom` flag:", fr: "Alternativement, vous pouvez charger la topologie dans le CLI de Mininet en utilisant l'indicateur `--custom` :", code: "sudo mn --custom your_script_name.py --topo myfirsttopo", lang: "bash"}
                ],
                troubleshooting: []
            }
        ]
    },
    "sec6": {
        section: { en: "Section 6: Building Controller Applications", fr: "Section 6 : Création d'Applications de Contrôleur" },
        labs: [
            {
                id: 'lab6-1',
                title: { en: '6.1 L2 Switch (Reactive)', fr: '6.1 Commutateur L2 (Réactif)' },
                overview: {
                    objective: {
                        en: `Create a Ryu controller that implements reactive L2 forwarding logic (MAC learning). This lab builds upon the basic L2 forwarding logic introduced with Ryu's built-in <code>simple_switch_13</code> application (see Section 2). The controller programs flows via OpenFlow in response to incoming packets.`,
                        fr: `Créez un contrôleur Ryu qui implémente une logique de transfert L2 réactive (apprentissage MAC). Ce TP s'appuie sur la logique de transfert L2 de base introduite avec l'application intégrée <code>simple_switch_13</code> de Ryu (voir Section 2). Le contrôleur programme les flux via OpenFlow en réponse aux paquets entrants.`
                    }
                },
                diagram: `graph TD; C(Ryu Controller); S1 --- S2; S1 --> H1("h1 <br> 10.0.0.1"); S1 --> H2("h2 <br> 10.0.0.2"); S2 --> H3("h3 <br> 10.0.0.3"); S2 --> H4("h4 <br> 10.0.0.4"); C -- "Packet_In / Flow_Mod" --> S1 & S2;`,
                steps: [
                    { en: "A 'Table-Miss' rule with low priority is installed first. It sends any unrecognized packets to the controller.", fr: "Une règle 'Table-Miss' de faible priorité est d'abord installée. Elle envoie tout paquet non reconnu au contrôleur." },
                    { en: "Upon receiving a Packet-In message, the controller learns the source MAC address and its corresponding input port.", fr: "À la réception d'un message Packet-In, le contrôleur apprend l'adresse MAC source et son port d'entrée correspondant." },
                    { en: "If the destination MAC is known, the controller installs a new, high-priority Flow-Mod rule for direct forwarding in the future.", fr: "Si l'adresse MAC de destination est connue, le contrôleur installe une nouvelle règle Flow-Mod de haute priorité pour un transfert direct à l'avenir." },
                    { en: "The controller sends a Packet-Out message to forward the original packet.", fr: "Le contrôleur envoie un message Packet-Out pour transférer le paquet original." }
                ],
                implementation: [
                    { en: "Full script for `switch_l2.py`:", fr: "Script complet pour `switch_l2.py` :", code: `from ryu.base import app_manager
from ryu.controller import ofp_event
from ryu.controller.handler import CONFIG_DISPATCHER, MAIN_DISPATCHER, set_ev_cls
from ryu.ofproto import ofproto_v1_3
from ryu.lib.packet import packet, ethernet

class SimpleSwitchL2(app_manager.RyuApp):
    OFP_VERSIONS = [ofproto_v1_3.OFP_VERSION]

    def __init__(self, *args, **kwargs):
        super(SimpleSwitchL2, self).__init__(*args, **kwargs)
        self.mac_to_port = {}

    @set_ev_cls(ofp_event.EventOFPSwitchFeatures, CONFIG_DISPATCHER)
    def switch_features_handler(self, ev):
        datapath = ev.msg.datapath
        ofproto = datapath.ofproto
        parser = datapath.ofproto_parser
        match = parser.OFPMatch()
        actions = [parser.OFPActionOutput(ofproto.OFPP_CONTROLLER, ofproto.OFPCML_NO_BUFFER)]
        self.add_flow(datapath, 0, match, actions)

    def add_flow(self, datapath, priority, match, actions):
        ofproto = datapath.ofproto
        parser = datapath.ofproto_parser
        inst = [parser.OFPInstructionActions(ofproto.OFPIT_APPLY_ACTIONS, actions)]
        mod = parser.OFPFlowMod(datapath=datapath, priority=priority, match=match, instructions=inst)
        datapath.send_msg(mod)

    @set_ev_cls(ofp_event.EventOFPPacketIn, MAIN_DISPATCHER)
    def _packet_in_handler(self, ev):
        msg = ev.msg
        datapath = msg.datapath
        ofproto = datapath.ofproto
        parser = datapath.ofproto_parser
        dpid = datapath.id
        self.mac_to_port.setdefault(dpid, {})
        pkt = packet.Packet(msg.data)
        eth = pkt.get_protocols(ethernet.ethernet)[0]
        dst = eth.dst
        src = eth.src
        in_port = msg.match['in_port']
        self.mac_to_port[dpid][src] = in_port
        if dst in self.mac_to_port[dpid]:
            out_port = self.mac_to_port[dpid][dst]
        else:
            out_port = ofproto.OFPP_FLOOD
        actions = [parser.OFPActionOutput(out_port)]
        if out_port != ofproto.OFPP_FLOOD:
            match = parser.OFPMatch(in_port=in_port, eth_dst=dst)
            self.add_flow(datapath, 1, match, actions)
        data = None
        if msg.buffer_id == ofproto.OFP_NO_BUFFER:
            data = msg.data
        out = parser.OFPPacketOut(datapath=datapath, buffer_id=msg.buffer_id, in_port=in_port, actions=actions, data=data)
        datapath.send_msg(out)`, lang: 'python' }
                ],
                testing: [
                    { en: "Run the controller and a suitable topology script. A `pingall` should succeed.", fr: "Exécutez le contrôleur et un script de topologie approprié. Un `pingall` devrait réussir."}
                ],
                troubleshooting: []
            }
        ]
    },
    "sec7": {
        section: { en: "Section 7: Advanced Event Demos & Mini-Projects", fr: "Section 7: Démos d'Événements Avancés & Mini-Projets" },
        labs: [
            {
                id: 'lab7-1',
                title: { en: '7.1 Proactive Traffic Engineering', fr: '7.1 Ingénierie de Trafic Proactive' },
                overview: {
                    objective: {
                        en: `This scenario demonstrates proactive traffic engineering by pre-configuring flow rules to control traffic paths based on protocol type (e.g., dropping HTTP) and time-based rules. Since the rules are installed upfront, no "Packet-IN" messages are needed for the switch to make forwarding decisions.`,
                        fr: `Ce scénario démontre l'ingénierie de trafic proactive en pré-configurant des règles de flux pour contrôler les chemins de trafic en fonction du type de protocole (par ex., rejeter HTTP) et de règles basées sur le temps. Comme les règles sont installées à l'avance, aucun message "Packet-IN" n'est nécessaire pour que le commutateur prenne des décisions de transfert.`
                    }
                },
                diagram: `graph TD;
                    subgraph "Controller (Proactive Setup)";
                        direction LR;
                        C((Controller));
                    end;
                    subgraph "Data Plane";
                        S1 --- S2 & S3;
                        S2 --- S4 & S5;
                        S3 --- S6 & S7;
                        S1 --> H1("h1");
                        S4 --> H2("h2");
                        S6 --> H3("h3");
                    end;
                    C -- "Installs Rules" --> S1 & S2 & S3 & S4 & S5 & S6 & S7;
                `,
                steps: [
                    {en: "Create a custom tree topology with multiple switches and hosts.", fr: "Créez une topologie en arbre personnalisée avec plusieurs commutateurs et hôtes."},
                    {en: "Clear any pre-existing flows from all switches to ensure a clean slate.", fr: "Effacez tous les flux préexistants de tous les commutateurs pour garantir un état de départ propre."},
                    {en: "Proactively install flow rules to create specific policies: one to forward general IPv4 traffic, one to explicitly drop HTTP traffic, and a set of rules to create a time-based path.", fr: "Installez proactivement des règles de flux pour créer des politiques spécifiques : une pour transférer le trafic IPv4 général, une pour rejeter explicitement le trafic HTTP, et un ensemble de règles pour créer un chemin basé sur le temps."}
                ],
                implementation: [
                    {en: "Start Mininet with a tree topology:", fr: "Démarrez Mininet avec une topologie en arbre :", code: "sudo mn --controller=remote,ip=192.168.1.50 --topo tree,depth=3,fanout=2 --switch=ovsk,protocols=OpenFlow13 --mac", lang: "bash"},
                    {en: "Clear existing flows from the switches (example for s1, repeat for all):", fr: "Effacez les flux existants des commutateurs (exemple pour s1, répétez pour tous) :", code: "mininet> sh ovs-ofctl -O OpenFlow13 del-flows s1", lang: "bash"},
                    {en: "Install rule to forward IPv4 packets towards h3 via port 2:", fr: "Installez une règle pour transférer les paquets IPv4 vers h3 via le port 2 :", code: `mininet> sh ovs-ofctl -O OpenFlow13 add-flow s1 "priority=100,ip,nw_dst=10.0.0.3,actions=output:2"`, lang: "bash"},
                    {en: "Install rule to drop HTTP (port 80) packets:", fr: "Installez une règle pour rejeter les paquets HTTP (port 80) :", code: `mininet> sh ovs-ofctl -O OpenFlow13 add-flow s1 "priority=200,ip,nw_proto=6,tp_dst=80,actions=drop"`, lang: "bash"},
                ],
                testing: [
                    {en: "Test that general IP traffic is forwarded:", fr: "Testez que le trafic IP général est transféré :", code: "mininet> h1 ping h3", lang: "bash"},
                    {en: "Test that HTTP traffic is dropped:", fr: "Testez que le trafic HTTP est rejeté :", code: "mininet> h1 wget h2", lang: "bash"},
                    {en: "Verify the flow tables to see your proactive rules:", fr: "Vérifiez les tables de flux pour voir vos règles proactives :", code: "mininet> sh ovs-ofctl -O OpenFlow13 dump-flows s1", lang: "bash"}
                ],
                troubleshooting: []
            },
            {
                id: 'lab7-2',
                title: { en: '7.2 Project: Load Balancer', fr: '7.2 Projet : Répartiteur de Charge' },
                overview: {
                    objective: {
                        en: `Implement a proactive Load Balancer to distribute traffic from two hosts to a server over two distinct paths.`,
                        fr: `Implémentez un répartiteur de charge proactif pour distribuer le trafic de deux hôtes vers un serveur via deux chemins distincts.`
                    }
                },
                diagram: `graph TD; S1 --> S2 & S3; S2 --> S4; S3 --> S4; subgraph Hosts; H1("h1 <br> 10.0.0.1"); H2("h2 <br> 10.0.0.2"); end; subgraph Server; Serv("Server <br> 10.0.0.3"); end; S1 --> H1; S1 --> H2; S4 --> Serv;`,
                steps: [
                    { en: "Create the specified topology with multiple paths between the source hosts and the destination server.", fr: "Créez la topologie spécifiée avec plusieurs chemins entre les hôtes sources et le serveur de destination." },
                    { en: "Manually install proactive flow rules on the switches to direct traffic from h1 down Path 1 and traffic from h2 down Path 2.", fr: "Installez manuellement des règles de flux proactives sur les commutateurs pour diriger le trafic de h1 via le chemin 1 et le trafic de h2 via le chemin 2." }
                ],
                implementation: [
                    { en: "Use `ovs-ofctl add-flow` to install rules on s1 that match on source IP and forward to different output ports.", fr: "Utilisez `ovs-ofctl add-flow` pour installer des règles sur s1 qui correspondent à l'IP source et transfèrent vers différents ports de sortie.", code: `sh ovs-ofctl add-flow s1 priority=10,ip,nw_src=10.0.0.1,nw_dst=10.0.0.3,actions=output:3
sh ovs-ofctl add-flow s1 priority=10,ip,nw_src=10.0.0.2,nw_dst=10.0.0.3,actions=output:4`, lang: 'bash' }
                ],
                testing: [
                    { en: "Use `tcpdump` on the intermediate switches (s2 and s3) to verify that traffic is being split as expected.", fr: "Utilisez `tcpdump` sur les commutateurs intermédiaires (s2 et s3) pour vérifier que le trafic est réparti comme prévu." }
                ],
                troubleshooting: []
            },
            {
                id: 'lab7-3',
                title: { en: '7.3 Project: Firewall', fr: '7.3 Projet : Pare-feu' },
                overview: {
                    objective: {
                        en: `Implement a basic SDN Firewall using proactive flow rules. The controller is programmed to allow only essential and specified traffic while dropping all other IPv4 traffic.`,
                        fr: `Implémentez un pare-feu SDN de base en utilisant des règles de flux proactives. Le contrôleur est programmé pour autoriser uniquement le trafic essentiel et spécifié, tout en rejetant tout autre trafic IPv4.`
                    }
                },
                diagram: `graph TD; S1 --> S2; S2 --> Server("Server <br> 10.0.0.3"); S1 --> H1("h1 <br> 10.0.0.1"); S1 --> H2("h2 <br> 10.0.0.2");`,
                steps: [
                    { en: "Define a strict security policy with priorities: Allow ARP, then allow specific ICMP/TCP flows, and finally, drop all other IP traffic with a low-priority rule.", fr: "Définissez une politique de sécurité stricte avec des priorités : Autorisez ARP, puis autorisez des flux ICMP/TCP spécifiques, et enfin, rejetez tout autre trafic IP avec une règle de faible priorité." }
                ],
                implementation: [
                    { en: "Install high-priority rules for allowed traffic (ARP, ICMP between H1/H2, TCP to Server).", fr: "Installez des règles de haute priorité pour le trafic autorisé (ARP, ICMP entre H1/H2, TCP vers le serveur)." },
                    { en: "Install a low-priority 'drop' rule for all other IP traffic to act as the default policy.", fr: "Installez une règle 'drop' de faible priorité pour tout autre trafic IP pour servir de politique par défaut.", code: `sh ovs-ofctl add-flow s1 priority=1,ip,actions=drop`, lang: 'bash' }
                ],
                testing: [
                    { en: "Verify that `h1 ping h2` works, but `h1 ping Server` fails.", fr: "Vérifiez que `h1 ping h2` fonctionne, mais que `h1 ping Server` échoue." },
                    { en: "Verify that `h1 iperf Server` works (TCP), but other traffic types are blocked.", fr: "Vérifiez que `h1 iperf Server` (TCP) fonctionne, mais que d'autres types de trafic sont bloqués." }
                ],
                troubleshooting: []
            }
        ]
    }
};