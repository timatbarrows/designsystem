import Styles from "../styles/styles";
import CodeBlock from "../components/snippets/CodeBlock";
import DatePicker from "../components/forms/DatePicker";

const DatePickerDoc: React.FC = () => {
  return (
    <div className={Styles.docWrapper}>
      <h1 className={Styles.docTitle}>DatePicker Component Documentation</h1>

      <p className={Styles.docDescription}>
        The <code>DatePicker</code> component allows users to select a single date or a date range.
        It supports quick selects, icons, min/max dates, and full theme customization using <code>useThemedStyles</code>.
      </p>

      <h2 className={Styles.docSectionTitle}>Features</h2>
      <ul className={Styles.docList}>
        <li>Single date or date range selection</li>
        <li>Quick select options (Last Week, This Month, etc.)</li>
        <li>Min and Max date restriction</li>
        <li>Optional calendar icons</li>
        <li>Supports Material icons, SVGs, or image URLs</li>
        <li>Full theming and style overrides</li>
        <li>Fully TypeScript typed</li>
      </ul>

      <h2 className={Styles.docSectionTitle}>Import</h2>
      <pre className={Styles.docCode}>
        <code>import DatePicker from '../components/forms/DatePicker';</code>
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
              <td className={Styles.docTableCol}>mode</td>
              <td className={Styles.docTableCol}><code>'single' | 'range'</code></td>
              <td className={Styles.docTableCol}><code>'single'</code></td>
              <td className={Styles.docTableCol}>Select single date or date range</td>
            </tr>
            <tr>
              <td className={Styles.docTableCol}>value</td>
              <td className={Styles.docTableCol}><code>string | {'{ start: string; end: string }'}</code></td>
              <td className={Styles.docTableCol}>''</td>
              <td className={Styles.docTableCol}>Selected date or date range</td>
            </tr>
            <tr>
              <td className={Styles.docTableCol}>onChange</td>
              <td className={Styles.docTableCol}><code>(value: string | {'{ start: string; end: string }'}) =&gt; void</code></td>
              <td className={Styles.docTableCol}>-</td>
              <td className={Styles.docTableCol}>Callback on date selection</td>
            </tr>
            <tr>
              <td className={Styles.docTableCol}>quickSelects</td>
              <td className={Styles.docTableCol}><code>string[]</code></td>
              <td className={Styles.docTableCol}>[]</td>
              <td className={Styles.docTableCol}>List of quick select options</td>
            </tr>
            <tr>
              <td className={Styles.docTableCol}>showClearButton</td>
              <td className={Styles.docTableCol}><code>boolean</code></td>
              <td className={Styles.docTableCol}><code>true</code></td>
              <td className={Styles.docTableCol}>Show/hide clear button</td>
            </tr>
            <tr>
              <td className={Styles.docTableCol}>icon</td>
              <td className={Styles.docTableCol}><code>React.ReactNode | string</code></td>
              <td className={Styles.docTableCol}>-</td>
              <td className={Styles.docTableCol}>Optional calendar icon</td>
            </tr>
            <tr>
              <td className={Styles.docTableCol}>iconType</td>
              <td className={Styles.docTableCol}><code>'material' | 'svg' | 'url'</code></td>
              <td className={Styles.docTableCol}><code>'material'</code></td>
              <td className={Styles.docTableCol}>Type of icon to render</td>
            </tr>
            <tr>
              <td className={Styles.docTableCol}>showInput</td>
              <td className={Styles.docTableCol}><code>boolean</code></td>
              <td className={Styles.docTableCol}><code>true</code></td>
              <td className={Styles.docTableCol}>Show input field</td>
            </tr>
            <tr>
              <td className={Styles.docTableCol}>minDate</td>
              <td className={Styles.docTableCol}><code>string</code></td>
              <td className={Styles.docTableCol}>-</td>
              <td className={Styles.docTableCol}>Minimum selectable date</td>
            </tr>
            <tr>
              <td className={Styles.docTableCol}>maxDate</td>
              <td className={Styles.docTableCol}><code>string</code></td>
              <td className={Styles.docTableCol}>-</td>
              <td className={Styles.docTableCol}>Maximum selectable date</td>
            </tr>
            <tr>
              <td className={Styles.docTableCol}>styles</td>
              <td className={Styles.docTableCol}><code>Partial&lt;Record&lt;string, string&gt;&gt;</code></td>
              <td className={Styles.docTableCol}><code>{}</code></td>
              <td className={Styles.docTableCol}>Custom style overrides</td>
            </tr>
            <tr>
              <td className={Styles.docTableCol}>theme</td>
              <td className={Styles.docTableCol}><code>Partial&lt;Theme&gt;</code></td>
              <td className={Styles.docTableCol}><code>defaultTheme</code></td>
              <td className={Styles.docTableCol}>Theme object for component</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={Styles.docSectionTitle}>Example Usage</h2>
<div className={Styles.docHighlight}>
      <DatePicker
        mode="single"
        value=""
        onChange={(val) => console.log('Selected date:', val)}
      />
      <CodeBlock title="Single DatePicker">{`
<DatePicker
  mode="single"
  value=""
  onChange={(val) => console.log('Selected date:', val)}
/>
      `}</CodeBlock></div><br/>
   <div className={Styles.docHighlight}>
      <DatePicker
        mode="range"
        value={{ start: '', end: '' }}
        onChange={(val) => console.log('Selected range:', val)}
      />
      <CodeBlock title="Range DatePicker">{`
<DatePicker
  mode="range"
  value={{ start: '', end: '' }}
  onChange={(val) => console.log('Selected range:', val)}
/>
      `}</CodeBlock>
</div><br/>
<div className={Styles.docHighlight}>
      <DatePicker
        mode="range"
        placeholder="Select a date range"
        quickSelects={['lastWeek', 'lastMonth', 'thisMonth']}
        showClearButton={false}
        onChange={(date) => console.log(date)}
      />
      <CodeBlock title="Date Range With Quick Selects">{`
<DatePicker
  mode="range"
  placeholder="Select a date range"
  quickSelects={['lastWeek', 'lastMonth', 'thisMonth']}
  showClearButton={false}
  onChange={(date) => console.log(date)}
/>
      `}</CodeBlock>
</div><br/>
<div className={Styles.docHighlight}>
      <DatePicker
        mode="single"
        value=""
        showInput={false}
        icon="calendar_month"
        iconType="material"
        onChange={(val) => console.log('Selected date:', val)}
      />
      <CodeBlock title="Date Picker Icon (Material Symbol)">{`
<DatePicker
  mode="single"
  value=""
  showInput={false}
  icon="calendar_month"
  iconType="material"
  onChange={(val) => console.log('Selected date:', val)}
/>
      `}</CodeBlock>
</div><br/><div className={Styles.docHighlight}>
      <DatePicker
        mode="range"
        value={{ start: '', end: '' }}
        placeholder="Select date range"
        icon="date_range"
        iconType="material"
        showInput
        iconInputPosition="end"
        onChange={(val) => console.log(val)}
      />
      <CodeBlock title="Icon and Input">{`
<DatePicker
  mode="range"
  value={{ start: '', end: '' }}
  placeholder="Select date range"
  icon="date_range"
  iconType="material"
  showInput
  iconInputPosition="end"
  onChange={(val) => console.log(val)}
/>
      `}</CodeBlock>
</div><br/>
    <div className={Styles.docHighlight}>
      <DatePicker
        mode="single"
        value=""
        minDate="2025-05-01"
        maxDate="2025-07-31"
        icon="calendar_month"
        iconType="material"
        onChange={(val) => console.log('Selected date within range:', val)}
      />
      <CodeBlock title="DatePicker with Min/Max Dates">{`
<DatePicker
  mode="single"
  value=""
  minDate="2025-05-01"
  maxDate="2025-07-31"
  icon="calendar_month"
  iconType="material"
  onChange={(val) => console.log('Selected date within range:', val)}
/>
      `}</CodeBlock>
</div>
      <h2 className={Styles.docSectionTitle}>Styling & Theming</h2>
      <p className={Styles.docDescription}>
        The DatePicker is fully themeable using the <code>useThemedStyles</code> hook and the <code>defaultTheme.ts</code> file.
      </p>

      <p className={Styles.docSubtitle}>Theme keys:</p>
      <ul className={Styles.docList}>
        <li><code>wrapper</code> – Outer container</li>
        <li><code>popup</code> – Calendar popup</li>
        <li><code>input</code> – Date input field</li>
        <li><code>calendar</code> – Grid of days</li>
        <li><code>day</code>, <code>daySelected</code>, <code>dayDisabled</code> – Day states</li>
        <li><code>monthNavButton</code> – Navigation buttons</li>
        <li><code>quickSelectButton</code> – Quick select option button</li>
      </ul>

    </div>
  );
};

export default DatePickerDoc;
