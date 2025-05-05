import Styles from "../styles/styles";
import { useState } from "react";
import CodeBlock from "../components/snippets/CodeBlock";
import FileUploader from "../components/forms/FileUploader";
import Modal from "../components/ui/Modal";

const FileUploaderDoc: React.FC = () => {
    
   
    const [isOpen, setIsOpen] = useState(false);
    const handleFileUpload = (files: File[]) => {
      console.log('Files:', files);
      setIsOpen(true);
      console.log(isOpen);
    };
      
    return (
<>
<Modal
  type="toaster"
  position="topCenter"
  isOpen={isOpen}
  onClose={() => {
    console.log('Modal closed');
    setIsOpen(false)
    console.log(isOpen);
}
}
  styles={{
    toasterContent: 'bg-green-600 text-white',
    toasterCloseButton: 'text-white',
  }}
  autoDismissAfterSeconds={5}
>
  <div><span className="material-symbols-outlined align-middle pr-2 text-white">check_circle</span>File uploaded successfully!</div>
</Modal>


    <div className={Styles.docWrapper}>
      <h1 className={Styles.docTitle}>FileUploader Component Documentation</h1>

      <p className={Styles.docDescription}>
        The <code>FileUploader</code> component allows users to upload files via drag-and-drop or manual browsing.
        It supports multiple configurations including accepted file types, size limits, error handling, and customizable styling.
      </p>

      <h2 className={Styles.docSectionTitle}>Features</h2>
      <ul className={Styles.docList}>
        <li>Drag and drop or manual file selection</li>
        <li>Multiple or single file upload</li>
        <li>File type restrictions</li>
        <li>Maximum file size validation</li>
        <li>Optional inline error messaging</li>
        <li>Customizable browse button (show/hide, icon, position)</li>
        <li>Themeable with <code>useThemedStyles</code></li>
        <li>Fully TypeScript typed</li>
      </ul>

      <h2 className={Styles.docSectionTitle}>Import</h2>
      <pre className={Styles.docCode}>
        <code>import FileUploader from '../components/forms/FileUploader';</code>
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
        <td className={Styles.docTableCol}>accept</td>
        <td className={Styles.docTableCol}><code>string[]</code></td>
        <td className={Styles.docTableCol}><code>[]</code> (all types)</td>
        <td className={Styles.docTableCol}>Accepted MIME types</td>
      </tr>
      <tr>
        <td className={Styles.docTableCol}>multiple</td>
        <td className={Styles.docTableCol}><code>boolean</code></td>
        <td className={Styles.docTableCol}><code>true</code></td>
        <td className={Styles.docTableCol}>Allow selecting multiple files</td>
      </tr>
      <tr>
        <td className={Styles.docTableCol}>maxSizeMB</td>
        <td className={Styles.docTableCol}><code>number</code></td>
        <td className={Styles.docTableCol}><code>5</code></td>
        <td className={Styles.docTableCol}>Maximum file size per file</td>
      </tr>
      <tr>
        <td className={Styles.docTableCol}>onChange</td>
        <td className={Styles.docTableCol}><code>(files: File[]) =&gt; void</code></td>
        <td className={Styles.docTableCol}>-</td>
        <td className={Styles.docTableCol}>Callback when files are successfully selected</td>
      </tr>
      <tr>
        <td className={Styles.docTableCol}>onError</td>
        <td className={Styles.docTableCol}><code>(error: string) =&gt; void</code></td>
        <td className={Styles.docTableCol}>-</td>
        <td className={Styles.docTableCol}>Callback when validation error occurs</td>
      </tr>
      <tr>
        <td className={Styles.docTableCol}>styles</td>
        <td className={Styles.docTableCol}><code>Partial&lt;Record&lt;string, string&gt;&gt;</code></td>
        <td className={Styles.docTableCol}><code>{}</code></td>
        <td className={Styles.docTableCol}>Override Tailwind styles per element</td>
      </tr>
      <tr>
        <td className={Styles.docTableCol}>theme</td>
        <td className={Styles.docTableCol}><code>Partial&lt;Theme&gt;</code></td>
        <td className={Styles.docTableCol}><code>defaultTheme</code></td>
        <td className={Styles.docTableCol}>Theme object</td>
      </tr>
      <tr>
        <td className={Styles.docTableCol}>showBrowseButton</td>
        <td className={Styles.docTableCol}><code>boolean</code></td>
        <td className={Styles.docTableCol}><code>true</code></td>
        <td className={Styles.docTableCol}>Show/hide the Browse button</td>
      </tr>
      <tr>
        <td className={Styles.docTableCol}>browseButtonIcon</td>
        <td className={Styles.docTableCol}><code>React.ReactNode | string</code></td>
        <td className={Styles.docTableCol}>-</td>
        <td className={Styles.docTableCol}>Icon for Browse button (optional)</td>
      </tr>
      <tr>
        <td className={Styles.docTableCol}>browseButtonIconPosition</td>
        <td className={Styles.docTableCol}><code>'left' | 'right'</code></td>
        <td className={Styles.docTableCol}><code>'left'</code></td>
        <td className={Styles.docTableCol}>Icon position in button</td>
      </tr>
      <tr>
        <td className={Styles.docTableCol}>iconType</td>
        <td className={Styles.docTableCol}><code>'material' | 'svg' | 'url'</code></td>
        <td className={Styles.docTableCol}><code>'material'</code></td>
        <td className={Styles.docTableCol}>Icon format type</td>
      </tr>
      <tr>
        <td className={Styles.docTableCol}>showInlineErrors</td>
        <td className={Styles.docTableCol}><code>boolean</code></td>
        <td className={Styles.docTableCol}><code>true</code></td>
        <td className={Styles.docTableCol}>Toggle inline error visibility</td>
      </tr>
    </tbody>
  </table>
</div>


      <h2 className={Styles.docSectionTitle}>Example Usage</h2>
      <div className={Styles.docHighlight}><FileUploader
  accept={['image/jpeg', 'image/png']}
  multiple
  maxSizeMB={5}
  onChange={(handleFileUpload)}
  onError={(error) => console.error('Error:', error)}
  showBrowseButton={true}
  browseButtonIcon="upload"
  browseButtonIconPosition="left"
  iconType="material"
  showInlineErrors={false}
/>

<CodeBlock title='File Uploader'>{`<Modal
  type="toaster"
  position="topCenter"
  isOpen={isOpen}
  onClose={() => {
    console.log('Modal closed');
    setIsOpen(false)
    console.log(isOpen);
}
}
  styles={{
    toasterContent: 'bg-green-600 text-white',
    toasterCloseButton: 'text-white',
  }}
  autoDismissAfterSeconds={5}
>
  <div><span className="material-symbols-outlined align-middle pr-2 text-white">check_circle</span>File uploaded successfully!</div>
</Modal>

<FileUploader
  accept={['image/jpeg', 'image/png']}
  multiple
  maxSizeMB={5}
  onChange={(files) => console.log('Files:', files)}
  onError={(error) => console.error('Error:', error)}
  showBrowseButton={true}
  browseButtonIcon="upload"
  browseButtonIconPosition="left"
  iconType="material"
  showInlineErrors={false}
/>`}</CodeBlock>
      </div>

      <h2 className={Styles.docSectionTitle}>Styling & Theming</h2>
      <p className={Styles.docDescription}>
        FileUploader styling is based on the <code>useThemedStyles</code> utility. 
        Default styles come from the <code>defaultTheme.ts</code> file.
      </p>

      <p className={Styles.docSubtitle}>Theme keys:</p>
      <ul className={Styles.docList}>
        <li><code>wrapper</code> – Outer container</li>
        <li><code>text</code> – Drag/drop instruction text</li>
        <li><code>browseButtonWrapper</code> – Container for the browse button</li>
        <li><code>browseButton</code> – The browse button itself</li>
        <li><code>errorText</code> – Error message text</li>
        <li><code>dragActive</code> – (Optional) Active drag styles</li>
      </ul>

      <h2 className={Styles.docSectionTitle}>Error Handling</h2>
      <p className={Styles.docDescription}>
        Errors are always sent via the <code>onError</code> callback and optionally shown inline based on <code>showInlineErrors</code>.
      </p>
      <ul className={Styles.docList}>
        <li><strong>File type not allowed:</strong> Dispatched when a file MIME type is invalid.</li>
        <li><strong>File too large:</strong> Dispatched when a file exceeds <code>maxSizeMB</code>.</li>
      </ul>

      <h2 className={Styles.docSectionTitle}>Notes</h2>
      <ul className={Styles.docList}>
        <li>Dragging a file triggers a hover highlight if enabled.</li>
        <li>Supports material icons, SVG, or URL icons for the Browse button.</li>
        <li>Works seamlessly with TailwindCSS and external theming.</li>
      </ul>
    </div>
</>
    )
}

export default FileUploaderDoc;