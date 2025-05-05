import React, { useState, useEffect } from 'react';
import Styles from '../styles/styles';
import CodeBlock from '../components/snippets/CodeBlock';
import Input from '../components/forms/Input';
import TextArea from '../components/forms/TextArea';
import RadioButton from '../components/forms/RadioButton';
import CheckBox from '../components/forms/CheckBox';
import Toggle from '../components/forms/Toggle';
import Button from '../components/forms/Button';
import DatePicker from '../components/forms/DatePicker';
import DatePickerDoc from './DatePickerDoc';
import FileUploaderDoc from './FileUploaderDoc';
/**
 * FormElements.tsx
 *
 * Central showcase for styled form elements using Tailwind CSS.
 * Includes: Input, Textarea, Select, Checkbox, Radio, and Toggle
 */

const FormElements: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className={Styles['app-title']}>FORMS</div>
      <div className={`${Styles.hr} mb-4`}></div>
      <div id="input">
        <InputContent />
      </div>
      <div id="textarea" className="scroll-mt-[85px]">
        <TextAreaContent />
      </div>
      <div id="radiobutton" className="scroll-mt-[85px]">
        <RadioButtonContent />
      </div>
      <div id="toggle" className="scroll-mt-[85px]">
        <ToggleContent />
      </div>
      <div id="checkbox" className="scroll-mt-[85px]">
        <CheckboxContent />
      </div>
      <div id="button" className="scroll-mt-[85px]">
        <ButtonContent />
      </div>
      <div id="date" className="scroll-mt-[85px]">
        <div>Date Picker Doc</div>
        <DatePickerDoc />
      </div>
      <div id="file" className="scroll-mt-[85px]">
        <FileUploaderDoc />
      </div>
      
      
     
    </div>
  );
};

export default FormElements;


export const ToggleContent: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    console.log('Toggle state changed:', enabled);
  }, [enabled]);

  return (
    <>
      <div className={`${Styles.h1} mb-2`}>TOGGLE</div>
      <div className={`${Styles.h2} mb-4`}>Controlled Toggle</div>
      <Toggle label="Notifications" checked={enabled} onChange={setEnabled} />
      <CodeBlock title="Controlled Toggle">{`const [enabled, setEnabled] = useState(false);

<Toggle label="Notifications" checked={enabled} onChange={setEnabled} />`}</CodeBlock>

      <div className={`${Styles.h2} mb-4`}>Uncontrolled Toggle</div>
      <Toggle label="Auto Updates" onChange={(val) => console.log("Uncontrolled value:", val)} />
      <CodeBlock title="Uncontrolled Toggle">{`<Toggle label="Auto Updates" onChange={(val) => console.log("Uncontrolled value:", val)} />`}</CodeBlock>

      <div className={`${Styles.h2} mb-4`}>Disabled Toggle Set To On</div>
      <Toggle label="Maintenance Mode" checked={true} disabled />
      <CodeBlock title="Disabled Toggle">{`<Toggle label="Maintenance Mode" checked={true} disabled />`}</CodeBlock>

      <div className={`${Styles.h2} mb-4`}>Vertically Aligned Label</div>
      <Toggle label="Enable Dark Mode" labelAlign="vertical" onChange={(val) => console.log("Vertical aligned value:", val)} />
      <CodeBlock title="Vertical Aligned Toggle">{`<Toggle label="Enable Dark Mode" labelAlign="vertical" onChange={(val) => console.log("Vertical aligned value:", val)} />`}</CodeBlock>
    </>
  );
};

export const CheckboxContent: React.FC = () => {
  const [isChecked, setIsChecked] = useState(true);
  const [logCheck, setLogCheck] = useState(false);
  const [multiCheck, setMultiCheck] = useState({
    news: true,
    updates: false,
    offers: true
  });

  const [multiCheckTwo, setMultiCheckTwo] = useState({
    news: true,
    updates: false,
    promotions: false
  });

  console.log("CheckBox - logCheck", logCheck);

  return (
    <>
      <div id="checkbox" className={`${Styles.h1} mb-2 scroll-mt-[64px]`}>CHECKBOX</div>

      {/* Controlled Checkbox */}
      <div className={`${Styles.h2} mb-4`}>Controlled Checkbox</div>
      <CheckBox label="Subscribe to newsletter" checked={isChecked} onChange={setIsChecked} />
      <CodeBlock title="Controlled Checkbox">{`const [isChecked, setIsChecked] = useState(true);

<CheckBox label="Subscribe to newsletter" checked={isChecked} onChange={setIsChecked} />`}</CodeBlock>

      {/* Uncontrolled Checkbox with logging */}
      <div className={`${Styles.h2} mb-4`}>Uncontrolled Checkbox with Logging</div>
      <CheckBox label="I agree" onChange={(val) => {
        setLogCheck(val);
        console.log("Checkbox value:", val);
      }} />
      <CodeBlock title="Uncontrolled with Logging">{`<CheckBox label="I agree" onChange={(val) => console.log("Checkbox value:", val)} />`}</CodeBlock>

      {/* Disabled Checkbox */}
      <div className={`${Styles.h2} mb-4`}>Disabled Checkbox</div>
      <CheckBox label="Terms accepted" checked={true} disabled />
      <CodeBlock title="Disabled Checkbox">{`<CheckBox label="Terms accepted" checked={true} disabled />`}</CodeBlock>

      {/* Multiple Checkboxes */}
      <div className={`${Styles.h2} mb-4`}>Multiple Checkboxes</div>
      <div className="space-y-2">
        <CheckBox label="News" checked={multiCheck.news} onChange={(val) => setMultiCheck(prev => ({ ...prev, news: val }))} />
        <CheckBox label="Product Updates" checked={multiCheck.updates} onChange={(val) => setMultiCheck(prev => ({ ...prev, updates: val }))} />
        <CheckBox label="Special Offers" checked={multiCheck.offers} onChange={(val) => setMultiCheck(prev => ({ ...prev, offers: val }))} />
      </div>
      <CodeBlock title="Multiple Checkboxes">{`const [multiCheck, setMultiCheck] = useState({
  news: true,
  updates: false,
  offers: true
});

<CheckBox label="News" checked={multiCheck.news} onChange={(val) => setMultiCheck(prev => ({ ...prev, news: val }))} />`}</CodeBlock>

      {/* Horizontal Multiple Checkboxes */}
      <div className={`${Styles.h2} mb-4`}>Multiple Checkboxes (Horizontal)</div>
      <div className="flex flex-row gap-6">
        <CheckBox label="News" labelAlign="horizontal" checked={multiCheckTwo.news} onChange={(val) => setMultiCheckTwo(prev => ({ ...prev, news: val }))} />
        <CheckBox label="Updates" labelAlign="horizontal" checked={multiCheckTwo.updates} onChange={(val) => setMultiCheckTwo(prev => ({ ...prev, updates: val }))} />
        <CheckBox label="Promotions" labelAlign="horizontal" checked={multiCheckTwo.promotions} onChange={(val) => setMultiCheckTwo(prev => ({ ...prev, promotions: val }))} />
      </div>
      <CodeBlock title="Multiple Checkboxes (Horizontal)">{`const [multiCheckTwo, setMultiCheckTwo] = useState({
  news: true,
  updates: false,
  promotions: false
});
<div className="flex flex-row gap-6">
    <CheckBox label="News" labelAlign="horizontal" checked={multiCheckTwo.news} onChange={(val) => setMultiCheckTwo(prev => ({ ...prev, news: val }))} />
    <CheckBox label="Updates" labelAlign="horizontal" checked={multiCheckTwo.updates} onChange={(val) => setMultiCheckTwo(prev => ({ ...prev, updates: val }))} />
    <CheckBox label="Promotions" labelAlign="horizontal" checked={multiCheckTwo.promotions} onChange={(val) => setMultiCheckTwo(prev => ({ ...prev, promotions: val }))} />
</div>`}</CodeBlock>
    </>
  );
};

export const ButtonContent: React.FC = () => {

    return (
        <div>
            <div className={`${Styles.h1} mb-2`}>BUTTON</div>
            <div className={`${Styles.h2} mb-4`}>Default Button</div>
            <Button label="Click Me" onClick={() => console.log('Rectangle!')} />
            <CodeBlock title='Default Button'>{`
                <Button label="Click Me" onClick={() => console.log('Rectangle!')} />
            `}</CodeBlock>
            <div className={`${Styles.h2} mb-4`}>Pill Button</div>
            <Button label="Submit" type="pill" onClick={() => console.log('Pill!')} />
            <CodeBlock title='Pill Button'>{`<Button label="Submit" type="pill" onClick={() => console.log('Pill!')} />`}</CodeBlock>
            <div className={`${Styles.h2} mb-4`}>Circle Button</div>
            <Button label="+" type="circle" onClick={() => console.log('Circle!')} />
            <CodeBlock title='Circle Button'>{`<Button label="+" type="circle" onClick={() => console.log('Circle!')} />`}</CodeBlock>
            <div className={`${Styles.h2} mb-4`}>Button Styles</div>
            <Button
  label="Save"
  onClick={() => console.log('Green Save!')}
  styles={{ active: 'bg-green-600 hover:bg-green-700 active:bg-green-800' }}
/>
 <CodeBlock title="Button Styles">{`
 <Button
  label="Save"
  onClick={() => console.log('Green Save!')}
  styles={{ active: 'bg-green-600 hover:bg-green-700 active:bg-green-800' }}
/>
 `}</CodeBlock>
            <div className={`${Styles.h2} mb-4`}>Material Icons</div>
            <Button
  label=""
  onClick={() => console.log('Rocket!')}
  iconPosition="right"
  materialSymbol="rocket_launch"
  materialFontSize={40}
  styles={{ materialSymbol: 'material-symbols-outlined text-blue-200', base: "w-20 h-20"}}
/>



            <CodeBlock title='Material icon button'>
                {`<!--THIS IS REQUIRED IN YOUR index.html PAGE-->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined">
<!--THIS IS REQUIRED IN YOUR index.html PAGE-->

<Button
  label=""
  onClick={() => console.log('Rocket!')}
  iconPosition="right"
  materialSymbol="rocket_launch"
  materialFontSize={40}
  styles={{ materialSymbol: 'material-symbols-outlined text-blue-200', base: "w-20 h-20"}}
/>
`}
            </CodeBlock>
           
        </div>
    )
}
export const InputContent: React.FC = () => {
  const [controlledValue, setControlledValue] = useState("Hello");
  return (
    <div id="input">
      <div className={`${Styles.h1} mb-2`}>INPUT</div>
      <div className={`${Styles.h2} mb-4`}>Controlled Input</div>
      <Input label="Name" value={controlledValue} onChange={setControlledValue} placeholder="Enter your name" />
      <CodeBlock title="Controlled Input">{`const [controlledValue, setControlledValue] = useState("Hello");

<Input label="Name" value={controlledValue} onChange={setControlledValue} placeholder="Enter your name" />`}</CodeBlock>

      <div className={`${Styles.h2} mb-4`}>Uncontrolled Input</div>
      <Input label="Search" placeholder="Search..." onChange={(val) => console.log(val)} />
      <CodeBlock title="Uncontrolled Input">{`<Input label="Search" placeholder="Search..." onChange={(val) => console.log(val)} />`}</CodeBlock>

      <div className={`${Styles.h2} mb-4`}>Disabled Input</div>
      <Input label="Username" defaultValue="Read Only" disabled />
      <CodeBlock title="Disabled Input">{`<Input label="Username" defaultValue="Read Only" disabled />`}</CodeBlock>

      <div className={`${Styles.h2} mb-4`}>Validator on Blur</div>
      <Input label="Email" validateOn="blur" validator={() => false} defaultValue="not@valid.com" />
      <CodeBlock title="Validator on Blur">{`<Input label="Email" validateOn="blur" validator={() => false} defaultValue="not@valid.com" />`}</CodeBlock>

      <div className={`${Styles.h2} mb-4`}>Validator on Change</div>
      <Input label="Code" validateOn="change" validator={() => false} defaultValue="123" />
      <CodeBlock title="Validator on Change">{`<Input label="Code" validateOn="change" validator={() => false} defaultValue="123" />`}</CodeBlock>
    </div>
  );
};

export const TextAreaContent: React.FC = () => {
  const [controlledText, setControlledText] = useState('Default text');
  return (
    <div id="textarea-content" className="scroll-mt-[64px]">
      <div className={`${Styles.h1} mb-2`}>TEXT AREA</div>
      <div className={`${Styles.h2} mb-4`}>Controlled TextArea</div>
      <TextArea label="Description" value={controlledText} onChange={setControlledText} placeholder="Enter a description" />
      <CodeBlock title="Controlled TextArea">{`const [controlledText, setControlledText] = useState("Default text");

<TextArea label="Description" value={controlledText} onChange={setControlledText} placeholder="Enter a description" />`}</CodeBlock>

      <div className={`${Styles.h2} mb-4`}>Uncontrolled TextArea</div>
      <TextArea label="Notes" placeholder="Start typing..." onChange={(val) => console.log(val)} />
      <CodeBlock title="Uncontrolled TextArea">{`<TextArea label="Notes" placeholder="Start typing..." onChange={(val) => console.log(val)} />`}</CodeBlock>

      <div className={`${Styles.h2} mb-4`}>Disabled TextArea</div>
      <TextArea label="Comments" defaultValue="Can't edit this" disabled />
      <CodeBlock title="Disabled TextArea">{`<TextArea label="Comments" defaultValue="Can't edit this" disabled />`}</CodeBlock>

      <div className={`${Styles.h2} mb-4`}>Validator on Blur</div>
      <TextArea label="Required Field" validator={() => false} validateOn="blur" />
      <CodeBlock title="Validator on Blur">{`<TextArea label="Required Field" validator={() => false} validateOn="blur" />`}</CodeBlock>

      <div className={`${Styles.h2} mb-4`}>Validator on Change</div>
      <TextArea label="Zip Code" defaultValue="123" validator={() => false} validateOn="change" />
      <CodeBlock title="Validator on Change">{`<TextArea label="Zip Code" defaultValue="123" validator={() => false} validateOn="change" />`}</CodeBlock>

      <div className={`${Styles.h2} mb-4`}>Custom Rows and Columns</div>
      <TextArea label="Custom Size" placeholder="This textarea is taller and wider" rows={6} cols={80} onChange={(val) => console.log(val)} styles={{ textarea: 'border-slate-200' }} />
      <CodeBlock title="Custom Rows and Columns">{`<TextArea label="Custom Size" placeholder="This textarea is taller and wider" rows={6} cols={80} onChange={(val) => console.log(val)} styles={{ textarea: 'border-slate-200' }} />`}</CodeBlock>
    </div>
  );
};

export const RadioButtonContent: React.FC = () => {
    const [selectedColor, setSelectedColor] = useState("red");
    useEffect(() => {
      console.log("Selected color changed to:", selectedColor);
    }, [selectedColor]);
  
    const [logValue, setLogValue] = useState("");
    const colorValidator = (val: string) => val !== "green";
  
    return (
      <>
        <div id="radio-button" className={`${Styles.h1} mb-2 scroll-mt-[64px]`}>RADIO BUTTON</div>
        <div className={`${Styles.h2} mb-4`}>Controlled Radio Button</div>
        <div className="flex flex-row gap-4">
          <RadioButton label="Red" value="red" checkedValue={selectedColor} onChange={setSelectedColor} />
          <RadioButton label="Yellow" value="yellow" checkedValue={selectedColor} onChange={setSelectedColor} />
          <RadioButton label="Green" value="green" checkedValue={selectedColor} onChange={setSelectedColor} />
        </div>
        <CodeBlock title="Controlled (Horizontal)">{`const [selectedColor, setSelectedColor] = useState("red");
  
  <RadioButton label="Red" value="red" checkedValue={selectedColor} onChange={setSelectedColor} />`}</CodeBlock>
  
        <div className={`${Styles.h2} mb-4`}>Vertical Logging</div>
        <div className="flex flex-row gap-2">
          <RadioButton label="One" value="1" checkedValue={logValue} onChange={(v) => setLogValue(v)} labelAlign="vertical" />
          <RadioButton label="Two" value="2" checkedValue={logValue} onChange={(v) => setLogValue(v)} labelAlign="vertical" />
        </div>
        <CodeBlock title="Uncontrolled (Vertical + Logging)">{`<RadioButton label="One" value="1" checkedValue={logValue} onChange={setLogValue} labelAlign="vertical" />`}</CodeBlock>
  
        <div className={`${Styles.h2} mb-4`}>Disabled RadioButton</div>
        <RadioButton label="Disabled Option" value="x" checkedValue="x" disabled />
        <CodeBlock title="Disabled RadioButton">{`<RadioButton label="Disabled Option" value="x" checkedValue="x" disabled />`}</CodeBlock>
  
        <div className={`${Styles.h2} mb-4`}>Styled RadioButton</div>
        <RadioButton
          label="Styled Option"
          value="custom"
          checkedValue="custom"
          onChange={() => {}}
          styles={{ input: 'accent-green-600 border border-green-600', invalid: 'ring-2 ring-pink-500' }}
        />
        <CodeBlock title="Styled RadioButton">{`<RadioButton label="Styled Option" value="custom" checkedValue="custom" onChange={() => {}} styles={{ input: 'accent-green-600 border border-green-600', invalid: 'ring-2 ring-pink-500' }} />`}</CodeBlock>
  
        <div className="space-y-4">
          <div className="text-lg font-semibold text-slate-600">Validator Fails on 'Green'</div>
          <div className="flex flex-row gap-4">
            <RadioButton label="Red" value="red" checkedValue={selectedColor} onChange={setSelectedColor} validator={colorValidator} />
            <RadioButton label="Green" value="green" checkedValue={selectedColor} onChange={setSelectedColor} validator={colorValidator} />
            <RadioButton label="Blue" value="blue" checkedValue={selectedColor} onChange={setSelectedColor} validator={colorValidator} />
          </div>
          <CodeBlock title="Validation Fails on 'Green'">{`const colorValidator = (val: string) => val !== "green";
  
  <RadioButton label="Green" value="green" checkedValue={selectedColor} onChange={setSelectedColor} validator={colorValidator} />`}</CodeBlock>
        </div>
      </>
    );
  };
  
export const DatePickerContent: React.FC = () => {

    return (
        <>
         <div id="radio-button" className={`${Styles.h1} mb-2 scroll-mt-[64px]`}>Date Picker</div>
         <div className={`${Styles.h2} mb-4`}>Single Date</div>
        <DatePicker
  mode="single"
  value=""
  onChange={(val) => console.log('Selected date:', val)}
/>
        <CodeBlock title="Single DatePicker">
  {`
<DatePicker
  mode="single"
  value=""
  onChange={(val) => console.log('Selected date:', val)}
/>
  `}
</CodeBlock>
<div className={`${Styles.h2} mb-4`}>Date Range</div>
<DatePicker
  mode="range"
  value={{ start: '', end: '' }}
  onChange={(val) => console.log('Selected range:', val)}
/>
<CodeBlock title="Range DatePicker">
  {`
<DatePicker
  mode="range"
  value={{ start: '', end: '' }}
  onChange={(val) => console.log('Selected range:', val)}
/>
  `}
</CodeBlock>
<div className={`${Styles.h2} mb-4`}>Quick Selects</div>
<DatePicker
        mode="range"
        placeholder="Select a date range"
        quickSelects={['lastWeek', 'lastMonth', 'thisMonth']}
        showClearButton={false}
        onChange={(date) => console.log(date)}
      />
<CodeBlock title='Date Range With Quick Selects'>
    {
        `<DatePicker
        mode="range"
        placeholder="Select a date range"
        quickSelects={['lastWeek', 'thisWeek', 'lastMonth']}
        showClearButton
      />`
    }
</CodeBlock>
<div className={`${Styles.h2} mb-4`}>Date Picker Icon (Material Symbol)</div>
<DatePicker
  mode="single"
  value=""
  showInput={false}
  icon="calendar_month"
  iconType="material"
  onChange={(val) => console.log('Selected date:', val)}
/>
<CodeBlock title="Date Picker Icon (Material Symbol)">
  {`
<DatePicker
  mode="single"
  value=""
  showInput={false}
  icon="calendar_month"
  iconType="material"
  onChange={(val) => console.log('Selected date:', val)}
/>
  `}
</CodeBlock>
<div className={`${Styles.h2} mb-4`}>Input Icon</div>
<DatePicker
  mode="range"
  value={{ start: '', end: '' }}
  onChange={(val) => console.log(val)}
  placeholder="Select date range"
  icon="date_range"
  iconType="material"
  showInput={true}
  iconInputPosition="end"
/>
<CodeBlock title='Icon and Input'>{`
<DatePicker
  mode="range"
  value={{ start: '', end: '' }}
  onChange={(val) => console.log(val)}
  placeholder="Select date range"
  icon="date_range"
  iconType="material"
  showInput={true}
  iconInputPosition="end"
/>

`}</CodeBlock>
<div className={`${Styles.h2} mb-4`}>Blocked Dates</div>
<DatePicker
  mode="single"
  value=""
  minDate="2025-05-01"
  maxDate="2025-7-31"
  icon="calendar_month"
  iconType="material"
  onChange={(val) => console.log('Selected date within range:', val)}
/>
<CodeBlock title="DatePicker with Min/Max Dates">
  {`
<DatePicker
  mode="single"
  value=""
  minDate="2025-05-01"
  maxDate="2025-7-31"
  icon="calendar_month"
  iconType="material"
  onChange={(val) => console.log('Selected date within range:', val)}
/>
  `}
</CodeBlock>


        </>
    )
}



