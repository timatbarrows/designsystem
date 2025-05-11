import React, { useState } from 'react';
import Styles from '../styles/styles';
import Modal from '../components/ui/Modal';
import Button from '../components/forms/Button';
import CodeBlock from '../components/snippets/CodeBlock';

const ModalDoc: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasterTopCenterOpen, setToasterTopCenterOpen] = useState(false);
  const [toasterBottomRightOpen, setToasterBottomRightOpen] = useState(false);
  const [toasterSuccessOpen, setToasterSuccessOpen] = useState(false);
  const [toasterWarningOpen, setToasterWarningOpen] = useState(false);
  const [toasterErrorOpen, setToasterErrorOpen] = useState(false);

  return (
    <div className={Styles.docWrapper}>
      <h1 className={Styles.docTitle}>Modal & Toaster Documentation</h1>

      <p className={Styles.docDescription}>
        The <code>Modal</code> component supports both modal dialogs and toaster-style notifications. 
        It supports positional rendering, auto-dismiss, close buttons, and full theme overrides via <code>useThemedStyles</code>.
      </p>

      <h2 className={Styles.docSectionTitle}>Features</h2>
      <ul className={Styles.docList}>
        <li>Supports modal and toaster display types</li>
        <li>Supports position presets for toasters (e.g. topLeft, bottomCenter)</li>
        <li>Optional close buttons with icons</li>
        <li>Auto-dismiss timing for toasters</li>
        <li>Full theming and style overrides</li>
        <li>Fully TypeScript typed</li>
      </ul>

      <h2 className={Styles.docSectionTitle}>Import</h2>
      <pre className={Styles.docCode}>
        <code>import Modal from '../components/Modal';</code>
      </pre>

      <h2 className={Styles.docSectionTitle}>Props</h2>
      <div className="overflow-x-auto">
        <table className={Styles.docTable}>
          <thead>
            <tr>
              <th className={Styles.docTableCol}>Prop</th>
              <th className={Styles.docTableCol}>Type</th>
              <th className={Styles.docTableCol}>Default</th>
              <th className={Styles.docTableCol}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={Styles.docTableCol}>isOpen</td>
              <td className={Styles.docTableCol}><code>boolean</code></td>
              <td className={Styles.docTableCol}>-</td>
              <td className={Styles.docTableCol}>Controls visibility of modal or toaster</td>
            </tr>
            <tr>
              <td className={Styles.docTableCol}>onClose</td>
              <td className={Styles.docTableCol}><code>() =&gt; void</code></td>
              <td className={Styles.docTableCol}>-</td>
              <td className={Styles.docTableCol}>Callback to close the modal</td>
            </tr>
            <tr>
              <td className={Styles.docTableCol}>type</td>
              <td className={Styles.docTableCol}><code>'default' | 'toaster'</code></td>
              <td className={Styles.docTableCol}><code>'default'</code></td>
              <td className={Styles.docTableCol}>Modal display type</td>
            </tr>
            <tr>
              <td className={Styles.docTableCol}>position</td>
              <td className={Styles.docTableCol}><code>ModalPosition</code></td>
              <td className={Styles.docTableCol}><code>'topCenter'</code></td>
              <td className={Styles.docTableCol}>Toaster position (e.g., 'bottomRight')</td>
            </tr>
            <tr>
              <td className={Styles.docTableCol}>closeButton</td>
              <td className={Styles.docTableCol}><code>&#123; type, value, size, className &#125;</code></td>
              <td className={Styles.docTableCol}>-</td>
              <td className={Styles.docTableCol}>Custom close icon props</td>
            </tr>
            <tr>
              <td className={Styles.docTableCol}>autoDismissAfterSeconds</td>
              <td className={Styles.docTableCol}><code>number</code></td>
              <td className={Styles.docTableCol}>-</td>
              <td className={Styles.docTableCol}>Auto-dismiss duration for toaster (in seconds)</td>
            </tr>
            <tr>
              <td className={Styles.docTableCol}>styles</td>
              <td className={Styles.docTableCol}><code>Partial&lt;ModalStyle&gt;</code></td>
              <td className={Styles.docTableCol}><code>{}</code></td>
              <td className={Styles.docTableCol}>Custom style overrides</td>
            </tr>
            <tr>
              <td className={Styles.docTableCol}>theme</td>
              <td className={Styles.docTableCol}><code>Partial&lt;Theme&gt;</code></td>
              <td className={Styles.docTableCol}><code>defaultTheme</code></td>
              <td className={Styles.docTableCol}>Custom theme object</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={Styles.docSectionTitle}>Example Usage</h2>

     
      <div className={Styles.docHighlight}>
      <Button label="Open Modal"  onClick={() => setIsModalOpen(true)} />
      <Modal isOpen={isModalOpen} styles={{modalCloseButton:'bg-slate-200 rounded-full hover:rounded-md hover:bg-blue-600 hover:text-white w-[60px] h-[60px] pl-4 pb-4 mr-2 mt-2'}} onClose={() => setIsModalOpen(false)}>
        <div>This is a default modal.</div>
      </Modal>
      <CodeBlock title="Default Modal Usage With Styled Close Button">{`<Modal isOpen={isModalOpen} styles={{modalCloseButton:'bg-slate-200 rounded-full hover:rounded-md hover:bg-blue-600 hover:text-white w-[60px] h-[60px] pl-4 pb-4 mr-2 mt-2'}} onClose={() => setIsModalOpen(false)}>
  <div>This is a default modal.</div>
</Modal>`}</CodeBlock>
</div><br/>
     
      <div className={Styles.docHighlight}>
      <Button label="Show Toaster (Top Center)" onClick={() => setToasterTopCenterOpen(true)} />
      <Modal
        isOpen={toasterTopCenterOpen}
        onClose={() => setToasterTopCenterOpen(false)}
        type="toaster"
        position="topCenter"
        autoDismissAfterSeconds={3}
      >
        Center Toaster Example
      </Modal>
      <CodeBlock title="Toaster - Top Center">{`
<Modal
  isOpen={toasterTopCenterOpen}
  onClose={() => setToasterTopCenterOpen(false)}
  type="toaster"
  position="topCenter"
  autoDismissAfterSeconds={3}
>
  Center Toaster Example
</Modal>`}</CodeBlock></div><br />

      
      <div className={Styles.docHighlight}>
      <Button label="Show Toaster (Bottom Right)" onClick={() => setToasterBottomRightOpen(true)} />
      <Modal
        isOpen={toasterBottomRightOpen}
        onClose={() => setToasterBottomRightOpen(false)}
        type="toaster"
        position="bottomRight"
        autoDismissAfterSeconds={3}
      >
        Bottom Right Toaster
      </Modal>
      <CodeBlock title="Toaster - Bottom Right">{`
<Modal
  isOpen={toasterBottomRightOpen}
  onClose={() => setToasterBottomRightOpen(false)}
  type="toaster"
  position="bottomRight"
  autoDismissAfterSeconds={3}
>
  Bottom Right Toaster
</Modal>`}</CodeBlock></div><br />

      {/* Themed Toasters */}
      <div className={Styles.docHighlight}>
      <div className="flex gap-4">
        <Button label="Success" onClick={() => setToasterSuccessOpen(true)} styles={{ active: 'bg-green-600 hover:bg-green-700' }} />
        <Button label="Warning" onClick={() => setToasterWarningOpen(true)} styles={{ active: 'bg-yellow-600 hover:bg-yellow-700' }} />
        <Button label="Error" onClick={() => setToasterErrorOpen(true)} styles={{ active: 'bg-red-600 hover:bg-red-700' }} />
      </div>

      <Modal
        isOpen={toasterSuccessOpen}
        onClose={() => setToasterSuccessOpen(false)}
        type="toaster"
        position="bottomCenter"
        autoDismissAfterSeconds={3}
        styles={{ toasterContent: 'bg-green-600 hover:bg-green-700 text-white' }}
      >
        <div className="flex gap-2 items-center">
          <span className="material-symbols-outlined">check_circle</span>
          <span>Success! Everything worked.</span>
        </div>
      </Modal>

      <Modal
        isOpen={toasterWarningOpen}
        onClose={() => setToasterWarningOpen(false)}
        type="toaster"
        position="bottomCenter"
        autoDismissAfterSeconds={3}
        styles={{ toasterContent: 'bg-yellow-600 hover:bg-yello-700 text-white' }}
      >
        <div className="flex gap-2 items-center">
          <span className="material-symbols-outlined">warning</span>
          <span>Warning! Something needs attention.</span>
        </div>
      </Modal>

      <Modal
        isOpen={toasterErrorOpen}
        onClose={() => setToasterErrorOpen(false)}
        type="toaster"
        position="bottomCenter"
        autoDismissAfterSeconds={3}
        styles={{ toasterContent: 'bg-red-600 text-white' }}
      >
        <div className="flex gap-2 items-center">
          <span className="material-symbols-outlined">error</span>
          <span>Error! Something went wrong.</span>
        </div>
      </Modal>

      <CodeBlock title="Custom Themed Toasters">{`
<div className="flex gap-4">
  <Button label="Success" onClick={() => setToasterSuccessOpen(true)} styles={{ active: 'bg-green-600 hover:bg-green-700' }} />
  <Button label="Warning" onClick={() => setToasterWarningOpen(true)} styles={{ active: 'bg-yellow-600 hover:bg-yellow-700' }} />
  <Button label="Error" onClick={() => setToasterErrorOpen(true)} styles={{ active: 'bg-red-600 hover:bg-red-700' }} />
</div>
<Modal
  isOpen={toasterSuccessOpen}
  onClose={() => setToasterSuccessOpen(false)}
  type="toaster"
  position="bottomCenter"
  autoDismissAfterSeconds={3}
  styles={{ toasterContent: 'bg-green-600 text-white' }}
>
  <div className="flex gap-2 items-center">
    <span className="material-symbols-outlined">check_circle</span>
    <span>Success! Everything worked.</span>
  </div>
</Modal>

<Modal
  isOpen={toasterWarningOpen}
  onClose={() => setToasterWarningOpen(false)}
  type="toaster"
  position="bottomCenter"
  autoDismissAfterSeconds={3}
  styles={{ toasterContent: 'bg-yellow-600 text-white' }}
>
  <div className="flex gap-2 items-center">
    <span className="material-symbols-outlined">warning</span>
    <span>Warning! Something needs attention.</span>
  </div>
</Modal>

<Modal
  isOpen={toasterErrorOpen}
  onClose={() => setToasterErrorOpen(false)}
  type="toaster"
  position="bottomCenter"
  autoDismissAfterSeconds={3}
  styles={{ toasterContent: 'bg-red-600 text-white' }}
>
  <div className="flex gap-2 items-center">
    <span className="material-symbols-outlined">error</span>
    <span>Error! Something went wrong.</span>
  </div>
</Modal>`}</CodeBlock></div><br />

      <h2 className={Styles.docSectionTitle}>Styling & Theming</h2>
      <p className={Styles.docDescription}>
        The Modal is fully themeable using the <code>useThemedStyles</code> hook and the <code>defaultTheme.ts</code> file.
      </p>
      <p className={Styles.docSubtitle}>Theme keys:</p>
      <ul className={Styles.docList}>
        <li><code>container</code> – Modal outer container</li>
        <li><code>overlay</code> – Background overlay for default modals</li>
        <li><code>content</code> – Modal inner content</li>
        <li><code>modalCloseButton</code> – Close icon/button</li>
        <li><code>toasterWrapper</code> – Wrapper for toaster positioning</li>
        <li><code>toasterContent</code> – Content box for toaster</li>
        <li><code>toasterText</code> – Text content inside toaster</li>
        <li><code>toasterCloseButton</code> – Toaster close button</li>
        <li><code>animateInTopCenter</code>, <code>animateOutTopCenter</code>, etc. – Animation keys for toaster transitions</li>
        <li><code>toasterPositionTopLeft</code>, etc. – Toaster position keys</li>
      </ul>
    </div>
  );
};

export default ModalDoc;
