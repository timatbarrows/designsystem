/**
 * SideBarNav
 *
 * A responsive sidebar navigation component.
 * - On mobile: shows a compact header with a hamburger icon.
 *   When toggled, expands into a full-screen overlay menu.
 * - On desktop: always visible on the left with fixed width.
 */

import { useState } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import Styles from '../../styles/styles';

interface NavItem {
  label: string;
  link: string;
  children?: NavItem[];
}

const navData: NavItem[] = [
  {
    label: 'General',
    link: '/',
    children: [
      { label: 'Navigation', link: '/' },
      { label: 'Modals', link: '/home#modals' },
    ],
  },
  {
    label: 'Forms',
    link: '/forms',
    children: [
      { label: 'Input', link: '/forms#input' },
      { label: 'Text Area', link: '/forms#textarea' },
      { label: 'Radio Button', link: '/forms#radiobutton' },
      { label: 'Toggle', link: '/forms#toggle' },
      { label: 'Button', link: '/forms#button' },
      { label: 'Date Picker', link: '/forms#date'},
      { label: 'File Uploader', link: '/forms#file'}
    ],
  },
];

const SideBarNav: React.FC = () => {
  const notDesktop = useMediaPredicate('(max-width: 768px)');
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleOverlayNav = () => setShowOverlay(!showOverlay);

  const renderNav = () => (
    <div className="pt-4">
      {navData.map((section, idx) => (
        <div key={idx} className="mb-4">
          {/* Parent Link */}
          <a
            href={section.link}
            className={`${Styles['nav-section']} ${Styles['nav-parent']}`}
            onClick={() => setShowOverlay(false)}
          >
            {section.label}
          </a>

          {/* Children Links */}
          {section.children && (
            <div className="flex flex-col gap-2 mt-2 pl-2">
              {section.children.map((child, childIdx) => (
                <a
                  key={childIdx}
                  href={child.link}
                  className={`${Styles.nav} ${Styles['nav-hover']} ${Styles['nav-children']}`}
                  onClick={() => setShowOverlay(false)}
                >
                  {child.label}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-full">
      {notDesktop ? (
        <>
          {/* Mobile Overlay Menu */}
          {showOverlay && (
            <div className="absolute top-0 left-0 w-screen h-screen bg-white z-50">
              <button
                onClick={toggleOverlayNav}
                aria-label="Close Menu"
                className="absolute top-4 right-4 p-2"
              >
                {/* Close Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="25px"
                  viewBox="0 -960 960 960"
                  width="25px"
                  fill="#000"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </button>
              <div className="pt-16 px-6">{renderNav()}</div>
            </div>
          )}

          {/* Mobile Hamburger Header */}
          <div className="md:hidden w-full h-[56px] bg-white border-b border-slate-200 flex items-center px-4">
            <button onClick={toggleOverlayNav} aria-label="Open Menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25px"
                viewBox="0 -960 960 960"
                width="25px"
                fill="#000"
              >
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
              </svg>
            </button>
          </div>
        </>
      ) : (
        <div className="w-[200px] bg-white border-r border-slate-200 pl-4 pt-4 h-full sticky top-[56px]">
          {renderNav()}
        </div>
      )}
    </div>
  );
};

export default SideBarNav;
