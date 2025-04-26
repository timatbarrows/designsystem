import React from 'react';
import {useState} from 'react';
import TabNav from '../nav/TabNav';
import CodeBlock from './CodeBlock';
import Styles from '../../styles/styles';


/**
 * Navigation
 *
 * Renders a section with a heading, horizontal rule, a TabNav example, and a code usage block.
 */
const Navigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Settings');

  const tab = [
    { label: 'Settings', default: true },
    { label: 'Data' },
    { label: 'Review' },
    { label: 'Publish' },
  ];

  const handleTabNav = (label: string) => {
    switch (label) {
      case 'Settings':
        setActiveTab('Settings');
        break;
      case 'Data':
        setActiveTab('Data');
        break;
      case 'Review':
        setActiveTab('Review');
        break;
      case 'Publish':
        setActiveTab('Publish');
        break;
    }
  };

  return (
    <>
        <div>
        <div className={Styles.h1}>Navigation</div>
        <div className={`${Styles.hr} mb-6`}></div>
        <div className={`${Styles.h2} mb-4`}>Default Tab Nav</div>
        <TabNav
            navData={[
            { label: 'Tab 1', value: '/', default: true },
            { label: 'Tab 2', value: '/=' },
            ]}
            onClick={(label) => console.log('Clicked:', label)}
        />

        

        <CodeBlock title="Example TabNav.tsx Usage">
            {`<TabNav 
    navData={[
        { value: '/overview', label: 'Overview' },
        { value: '/reports', label: 'Reports' },
        { value: '/settings', label: 'Settings', inactive: true },
    ]}
    activeTab="Overview"
    onClick={(label) => console.log("Clicked:", label)}
    />`}
        </CodeBlock>
        </div>
        <div>
        <div className={`${Styles.h2} mb-4`}>Page Tab Nav</div>
        <div className='rounded-md bg-white'>
        <TabNav
            navData={tab.map((t) => ({ label: t.label, value: `/${t.label.toLowerCase()}`, default: t.default }))}
            activeTab={activeTab}
            onClick={handleTabNav}
            styles={{
                navContainer: 'w-full bg-white',
                navItemBase: 'flex-1 text-center py-2 font-roboto font-normal',
                navItemActive: 'bg-white text-slate-600 border-b-4 border-blue-600',
                
              }}
              styleSettings={{
                roundHoverIndexEdges: {
                    0: { tl: 'md' },
                    3: { tr: 'md' },
                  }
              }}
        />
        <div className='p-4 mb-4'>
            Page Content
        </div>
        </div>
        <CodeBlock title="Example TabNav.tsx Usage">
{`
const tab = [
  { label: 'Settings', default: true },
  { label: 'Data' },
  { label: 'Review' },
  { label: 'Publish' },
];

const handleTabNav = (label: string) => {
  switch (label) {
    case 'Settings':
      setActiveTab('Settings');
      break;
    case 'Data':
      setActiveTab('Data');
      break;
    case 'Review':
      setActiveTab('Review');
      break;
    case 'Publish':
      setActiveTab('Publish');
      break;
  }
};

<TabNav
  navData={tab.map((t) => ({ label: t.label, value: '/' + t.label.toLowerCase(), default: t.default }))}
  activeTab={activeTab}
  onClick={handleTabNav}
  styles={{
    navContainer: 'w-full bg-white',
    navItemBase: 'flex-1 text-center py-2 font-roboto font-normal',
    navItemActive: 'bg-white text-slate-600 border-b-4 border-blue-600',
  }}
  styleSettings={{
    roundHoverIndexEdges: {
      0: { tl: 'md' },
      3: { tr: 'md' },
    },
  }}
/>;
`}
</CodeBlock>
     </div>
    </>
  );
};

export default Navigation;