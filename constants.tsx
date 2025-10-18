import React from 'react';
import type { NavItem, SectionId } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'topology', label: 'Lab Topology' },
  { id: 'mininet', label: 'Mininet' },
  { id: 'ryu', label: 'Ryu Controller' },
  { id: 'access', label: 'Lab Access' },
  { id: 'labs', label: 'Interactive Labs' },
  { id: 'credits', label: 'Credits' },
];

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <pre className="bg-gray-800 text-white p-4 rounded-lg my-4 overflow-x-auto">
        <code>{children}</code>
    </pre>
);

const HomePage: React.FC = () => (
    <>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Welcome to the ENSTTIC SDNLAB</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            This SDN Lab is a virtual environment based on Mininet network emulator and Ryu OpenFlow controller.
            This platform is dedicated for students and researchers in order to learn and practice Software Defined Networking concepts and to test their own SDN applications.
            Feel free to explore the different sections of this website to learn more about our Lab.
        </p>
    </>
);

const TopologyPage: React.FC = () => (
    <>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">Lab Topology</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            The lab is composed of one OpenFlow controller (Ryu) and a Mininet network that emulates a simple topology of 3 hosts and 3 switches as shown in the figure below.
        </p>
        <div className="w-full flex justify-center">
            <img src="https://djainttic.github.io/ENSTTIC_SDNLAB/images/topo.png" alt="Lab Topology" className="max-w-full md:max-w-2xl h-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-700" />
        </div>
    </>
);

const MininetPage: React.FC = () => (
    <>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Mininet</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Mininet is a network emulator which creates a network of virtual hosts, switches, controllers, and links. Mininet hosts run standard Linux network software, and its switches support OpenFlow for highly flexible custom routing and Software-Defined Networking.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            The Mininet VM is available in our Lab and can be accessed through SSH.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-semibold">
            To start the emulated network, you need to run the following command inside the Mininet VM:
        </p>
        <CodeBlock>sudo mn --custom=topo.py --topo=mytopo --controller=remote,ip=192.168.56.1,port=6653</CodeBlock>
    </>
);

const RyuPage: React.FC = () => (
    <>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Ryu Controller</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Ryu is a component-based software defined networking framework. Ryu provides software components with well defined API that make it easy for developers to create new network management and control applications. Ryu supports various protocols for managing network devices, such as OpenFlow, Netconf, OF-config, etc. About OpenFlow, Ryu supports fully 1.0, 1.2, 1.3, 1.4, 1.5 and Nicira Extensions.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-semibold">
            To start the Ryu controller with a simple switch application, run the following command:
        </p>
        <CodeBlock>ryu-manager ryu.app.simple_switch_13</CodeBlock>
    </>
);

const AccessPage: React.FC = () => (
    <>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Lab Access</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            To get access to the SDNLAB, please send a request to the Lab administrator:
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/50 border-l-4 border-blue-500 text-blue-800 dark:text-blue-200 p-4 rounded-r-lg">
            <p className="font-semibold">Dr. Djalal eddine ZITOUNI</p>
            <p>d.zitouni@ensttic.dz</p>
        </div>
    </>
);

const CreditsPage: React.FC = () => (
    <>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">Credits</h1>
        <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
            <p>This SDNLAB is designed and maintained by:</p>
            <ul className="list-disc list-inside pl-4 space-y-2">
                <li><span className="font-semibold">Dr. Djalal eddine ZITOUNI</span> (ENSTTIC)</li>
                <li><span className="font-semibold">Dr. Abdelkrim Rachedi</span> (UPEM)</li>
            </ul>
            <p>We would like to thank our students for their contribution:</p>
            <ul className="list-disc list-inside pl-4 space-y-2">
                <li>Aymen KORICHI</li>
                <li>Houssem Eddine ZERROUKI</li>
                <li>Adel SMAINI</li>
                <li>Yasser ARABI</li>
            </ul>
        </div>
    </>
);


export const PAGE_CONTENT: Record<SectionId, React.ReactNode> = {
  home: <HomePage />,
  topology: <TopologyPage />,
  mininet: <MininetPage />,
  ryu: <RyuPage />,
  access: <AccessPage />,
  labs: <></>, // This is now handled by App.tsx logic
  credits: <CreditsPage />,
};