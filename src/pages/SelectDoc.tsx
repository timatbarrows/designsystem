import React, { useState } from 'react';
import Styles from '../styles/styles';
import CodeBlock from '../components/snippets/CodeBlock';
import Select from '../components/forms/Select';

const sampleOptions = [
  { itemLabel: 'Apple', itemValue: 'apple' },
  { itemLabel: 'Banana', itemValue: 'banana' },
  { itemLabel: 'Cherry', itemValue: 'cherry' },
];

const groupedOptions = [
  {
    groupName: 'Fruits',
    groupValue: [
      { itemLabel: 'Apple', itemValue: 'apple' },
      { itemLabel: 'Banana', itemValue: 'banana' },
    ],
  },
  {
    groupName: 'Vegetables',
    groupValue: [
      { itemLabel: 'Carrot', itemValue: 'carrot' },
      { itemLabel: 'Lettuce', itemValue: 'lettuce' },
    ],
  },
];

const SelectDoc: React.FC = () => {
  const [selectedSingle, setSelectedSingle] = useState<string>('');
  const [selectedMulti, setSelectedMulti] = useState<string[]>([]);
  const [selectedGrouped, setSelectedGrouped] = useState<string>('');
  const [selectedFiltered, setSelectedFiltered] = useState<string>('');

  return (
    <div className={Styles.docWrapper}>
      <h1 className={Styles.docTitle}>Select Component Documentation</h1>

      <p className={Styles.docDescription}>
        The <code>Select</code> component supports typeahead, grouping, multiselect, flattening, theming, and disabled states. It’s keyboard accessible and styleable via <code>defaultTheme.ts</code>.
      </p>
      <h2 className={Styles.docSectionTitle}>Features</h2>
        <ul className={Styles.docList}>
        <li>Supports single and multi-selection</li>
        <li>Optional typeahead filtering input</li>
        <li>Grouped or ungrouped options supported</li>
        <li>Flattening of deeply nested data structures</li>
        <li>Keyboard accessible (arrow keys, Enter, Escape)</li>
        <li>Handles disabled state with visual indication</li>
        <li>Full theming and Tailwind class overrides via <code>useThemedStyles</code></li>
        <li>Custom label and placeholder rendering</li>
        <li>Customizable dropdown styling and layout</li>
        <li>Fully TypeScript typed with strict prop validation</li>
        </ul>
      <h2 className={Styles.docSectionTitle}>Import</h2>
      <pre className={Styles.docCode}>
        <code>import Select from '../components/forms/Select';</code>
      </pre>

      <h2 className={Styles.docSectionTitle}>Props</h2>
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
            <td className={Styles.docTableCol}>label</td>
            <td className={Styles.docTableCol}><code>string</code></td>
            <td className={Styles.docTableCol}>-</td>
            <td className={Styles.docTableCol}>Optional label above the select</td>
          </tr>
          <tr>
            <td className={Styles.docTableCol}>options</td>
            <td className={Styles.docTableCol}><code>Option[] | GroupedOption[]</code></td>
            <td className={Styles.docTableCol}>-</td>
            <td className={Styles.docTableCol}>Options to display</td>
          </tr>
          <tr>
            <td className={Styles.docTableCol}>selected</td>
            <td className={Styles.docTableCol}><code>string | string[]</code></td>
            <td className={Styles.docTableCol}>-</td>
            <td className={Styles.docTableCol}>Current selected value(s)</td>
          </tr>
          <tr>
            <td className={Styles.docTableCol}>onChange</td>
            <td className={Styles.docTableCol}><code>(val: string | string[]) =&gt; void</code></td>
            <td className={Styles.docTableCol}>-</td>
            <td className={Styles.docTableCol}>Callback for selection change</td>
          </tr>
          <tr>
            <td className={Styles.docTableCol}>multi</td>
            <td className={Styles.docTableCol}><code>boolean</code></td>
            <td className={Styles.docTableCol}><code>false</code></td>
            <td className={Styles.docTableCol}>Allow multiple selection</td>
          </tr>
          <tr>
            <td className={Styles.docTableCol}>typeahead</td>
            <td className={Styles.docTableCol}><code>boolean</code></td>
            <td className={Styles.docTableCol}><code>false</code></td>
            <td className={Styles.docTableCol}>Enable input filter</td>
          </tr>
          <tr>
            <td className={Styles.docTableCol}>grouping</td>
            <td className={Styles.docTableCol}><code>boolean</code></td>
            <td className={Styles.docTableCol}><code>false</code></td>
            <td className={Styles.docTableCol}>Group options by groupName</td>
          </tr>
          <tr>
            <td className={Styles.docTableCol}>flattenLevel</td>
            <td className={Styles.docTableCol}><code>number</code></td>
            <td className={Styles.docTableCol}><code>1</code></td>
            <td className={Styles.docTableCol}>0 to flatten deeply, 2+ for deeper grouping</td>
          </tr>
          <tr>
            <td className={Styles.docTableCol}>disabled</td>
            <td className={Styles.docTableCol}><code>boolean</code></td>
            <td className={Styles.docTableCol}><code>false</code></td>
            <td className={Styles.docTableCol}>Disables selection</td>
          </tr>
          <tr>
            <td className={Styles.docTableCol}>styles</td>
            <td className={Styles.docTableCol}><code>Record&lt;string, string&gt;</code></td>
            <td className={Styles.docTableCol}><code>{}</code></td>
            <td className={Styles.docTableCol}>Custom style overrides</td>
          </tr>
          <tr>
            <td className={Styles.docTableCol}>theme</td>
            <td className={Styles.docTableCol}><code>Partial&lt;Theme&gt;</code></td>
            <td className={Styles.docTableCol}><code>defaultTheme</code></td>
            <td className={Styles.docTableCol}>Provide theme key overrides</td>
          </tr>
        </tbody>
      </table>
      <h2 className={Styles.docSectionTitle}>Example Usages</h2>

      <div className={Styles.docHighlight}>
        <Select
          label="Choose a fruit"
          options={sampleOptions}
          selected={selectedSingle}
          onChange={(val) => {
            if (typeof val === 'string') setSelectedSingle(val);
          }}
        />
        <CodeBlock title="Single Select">{`<Select
  label="Choose a fruit"
  options={sampleOptions}
  selected={selectedSingle}
  onChange={(val) => {
    if (typeof val === 'string') setSelectedSingle(val);
  }}
/>`}</CodeBlock>
      </div><br />

      <div className={Styles.docHighlight}>
        <Select
          label="Pick multiple"
          options={sampleOptions}
          selected={selectedMulti}
          multi
          onChange={(val) => {
            if (Array.isArray(val)) setSelectedMulti(val);
          }}
        />
        <CodeBlock title="Multi Select">{`<Select
  label="Pick multiple"
  options={sampleOptions}
  selected={selectedMulti}
  multi
  onChange={(val) => {
    if (Array.isArray(val)) setSelectedMulti(val);
  }}
/>`}</CodeBlock>
      </div><br />

      <div className={Styles.docHighlight}>
        <Select
          label="Choose an item"
          options={groupedOptions}
          selected={selectedGrouped}
          onChange={(val) => {
            if (typeof val === 'string') setSelectedGrouped(val);
          }}
          grouping
        />
        <CodeBlock title="Grouped Select">{`<Select
  label="Choose an item"
  options={groupedOptions}
  selected={selectedGrouped}
  onChange={(val) => {
    if (typeof val === 'string') setSelectedGrouped(val);
  }}
  grouping
/>`}</CodeBlock>
      </div><br />

      <div className={Styles.docHighlight}>
        <Select
          label="Search for item"
          options={groupedOptions}
          selected={selectedFiltered}
          onChange={(val) => {
            if (typeof val === 'string') setSelectedFiltered(val);
          }}
          typeahead
          flattenLevel={0}
        />
        <CodeBlock title="Typeahead with Flattening">{`<Select
  label="Search for item"
  options={groupedOptions}
  selected={selectedFiltered}
  onChange={(val) => {
    if (typeof val === 'string') setSelectedFiltered(val);
  }}
  typeahead
  flattenLevel={0}
/>`}</CodeBlock>
      </div><br />



      <h2 className={Styles.docSectionTitle}>Theming</h2>
      <p className={Styles.docDescription}>
        The <code>Select</code> component supports full style overrides via the <code>useThemedStyles</code> hook and the <code>defaultTheme.ts</code> file.
      </p>
    </div>
  );
};

export default SelectDoc;
