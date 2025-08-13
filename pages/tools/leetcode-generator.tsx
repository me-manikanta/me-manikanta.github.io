import React, { useState, useMemo } from "react";
import { Copy, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";

type MainType = 'String' | 'Array' | 'Matrix' | 'Tree' | 'Graph' | 'Custom';
type ArraySubType = 'char' | 'string' | 'int' | 'double' | 'bool';
type CharCasing = 'lowercase' | 'uppercase' | 'mixed';

const DATA_TYPES: MainType[] = ['Array', 'String'];
const ARRAY_SUB_TYPES: ArraySubType[] = ['char', 'string', 'int', 'double', 'bool'];

const GeneratorButton = ({ label, selected, onClick }: { label: string, selected: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
      selected
        ? 'bg-blue-600 text-white'
        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
    }`}
  >
    {label}
  </button>
);

const SubTypeButton = ({ label, selected, onClick }: { label: string, selected: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
      selected
        ? 'bg-blue-600 text-white'
        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
    }`}
  >
    {label}
  </button>
);

const NumberInput = ({ label, value, onChange, min, max, range, helpText }: { label: string, value: number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, min?: number, max?: number, range?: string, helpText?: string }) => (
  <div className="flex-1">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
    <input
      type="number"
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
    {helpText && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{helpText}</p>}
  </div>
);

const Checkbox = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 focus:ring-blue-500"
    />
    <label className="text-sm text-gray-700 dark:text-gray-300">{label}</label>
  </div>
);

export default function TestCaseGenerator() {
  const [mainType, setMainType] = useState<MainType>('Array');
  const [arraySubType, setArraySubType] = useState<ArraySubType>('int');
  
  // Array settings
  const [arrayLength, setArrayLength] = useState(10);
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(100);
  const [isSorted, setIsSorted] = useState(false);
  const [allowRepeated, setAllowRepeated] = useState(true);
  const [openingBracket, setOpeningBracket] = useState('[');
  const [closingBracket, setClosingBracket] = useState(']');
  const [charCasing, setCharCasing] = useState<CharCasing>('lowercase');

  // String settings
  const [stringLength, setStringLength] = useState(10);
  const [stringMinLength, setStringMinLength] = useState(1);
  const [stringMaxLength, setStringMaxLength] = useState(20);
  const [useFixedLength, setUseFixedLength] = useState(true);
  const [stringCasing, setStringCasing] = useState<CharCasing>('lowercase');
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [customCharset, setCustomCharset] = useState('');

  const [generatedOutput, setGeneratedOutput] = useState('');
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);

  const handleGenerate = () => {
    if (mainType === 'Array') {
      let values: (number | string | boolean)[] = [];
      const generateValue = () => {
        switch (arraySubType) {
          case 'int':
            return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
          case 'double':
            return parseFloat((Math.random() * (maxValue - minValue) + minValue).toFixed(2));
          case 'char':
            let chars = '';
            if (charCasing === 'lowercase') {
              chars = 'abcdefghijklmnopqrstuvwxyz';
            } else if (charCasing === 'uppercase') {
              chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            } else {
              chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            }
            return chars[Math.floor(Math.random() * chars.length)];
          case 'string':
            let sChars = '';
            if (charCasing === 'lowercase') {
              sChars = 'abcdefghijklmnopqrstuvwxyz';
            } else if (charCasing === 'uppercase') {
              sChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            } else {
              sChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            }
            let str = '';
            const len = Math.floor(Math.random() * 10) + 1;
            for (let i = 0; i < len; i++) {
              str += sChars[Math.floor(Math.random() * sChars.length)];
            }
            return `"${str}"`;
          case 'bool':
            return Math.random() > 0.5;
        }
      };

      if (allowRepeated) {
        for (let i = 0; i < arrayLength; i++) {
          values.push(generateValue());
        }
      } else {
        const valueSet = new Set<(number | string | boolean)>();
        // Basic check to prevent infinite loops
        if (arraySubType === 'int' && (maxValue - minValue + 1) < arrayLength) {
            alert("Cannot generate unique array: range is smaller than length.");
            return;
        }
        while (valueSet.size < arrayLength) {
          valueSet.add(generateValue());
        }
        values = Array.from(valueSet);
      }

      if (isSorted) {
        if (arraySubType === 'int' || arraySubType === 'double') {
          (values as number[]).sort((a, b) => a - b);
        } else if (arraySubType === 'char' || arraySubType === 'string') {
          (values as string[]).sort();
        }
      }
      
      setGeneratedOutput(`${openingBracket}${values.join(', ')}${closingBracket}`);
    } else if (mainType === 'String') {
      // Generate character set
      let charset = '';
      
      if (customCharset) {
        charset = customCharset;
      } else {
        if (stringCasing === 'lowercase') {
          charset += 'abcdefghijklmnopqrstuvwxyz';
        } else if (stringCasing === 'uppercase') {
          charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        } else {
          charset += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        
        if (includeNumbers) {
          charset += '0123456789';
        }
        
        if (includeSpecialChars) {
          charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        }
      }
      
      // Generate string length
      const length = useFixedLength ? stringLength : Math.floor(Math.random() * (stringMaxLength - stringMinLength + 1)) + stringMinLength;
      
      // Generate string
      let result = '';
      for (let i = 0; i < length; i++) {
        result += charset[Math.floor(Math.random() * charset.length)];
      }
      
      setGeneratedOutput(`"${result}"`);
    }
  };

  const handleCopyToClipboard = () => {
    if (generatedOutput) {
      navigator.clipboard.writeText(generatedOutput);
      setShowCopyTooltip(true);
      setTimeout(() => setShowCopyTooltip(false), 2000);
    }
  };

  const renderArrayOptions = () => (
    <div className="space-y-6">
      <div className="flex justify-center gap-3">
        {ARRAY_SUB_TYPES.map(type => (
          <SubTypeButton
            key={type}
            label={type}
            selected={arraySubType === type}
            onClick={() => setArraySubType(type)}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NumberInput
          label="Length of the array"
          value={arrayLength}
          onChange={(e) => setArrayLength(Math.max(1, parseInt(e.target.value) || 1))}
          min={1}
          max={1000000}
          helpText="Range: 1 to 1,000,000"
        />
        {(arraySubType === 'int' || arraySubType === 'double') && (
          <>
            <NumberInput
              label="Min value"
              value={minValue}
              onChange={(e) => setMinValue(parseInt(e.target.value) || 0)}
              min={-1000000}
              max={1000000}
              helpText="Range: -1,000,000 to 1,000,000"
            />
            <NumberInput
              label="Max value"
              value={maxValue}
              onChange={(e) => setMaxValue(parseInt(e.target.value) || 0)}
              min={-1000000}
              max={1000000}
              helpText="Range: -1,000,000 to 1,000,000"
            />
          </>
        )}
      </div>

      <div className="flex items-center justify-center gap-8 pt-4">
        <Checkbox label="Sort" checked={isSorted} onChange={(e) => setIsSorted(e.target.checked)} />
        <Checkbox label="Allow repeated values" checked={allowRepeated} onChange={(e) => setAllowRepeated(e.target.checked)} />
        {(arraySubType === 'char' || arraySubType === 'string') && (
          <div className="flex items-center gap-2">
            <label htmlFor="casing-select" className="text-sm text-gray-700 dark:text-gray-300">Casing:</label>
            <select
              id="casing-select"
              value={charCasing}
              onChange={(e) => setCharCasing(e.target.value as CharCasing)}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="lowercase">Lowercase</option>
              <option value="uppercase">Uppercase</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>
        )}
      </div>

      <div className="flex items-end gap-4 mt-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Opening</label>
          <input
            type="text"
            value={openingBracket}
            onChange={(e) => setOpeningBracket(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Closing</label>
          <input
            type="text"
            value={closingBracket}
            onChange={(e) => setClosingBracket(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderStringOptions = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <Checkbox 
              label="Fixed Length" 
              checked={useFixedLength} 
              onChange={(e) => setUseFixedLength(e.target.checked)} 
            />
          </div>
          {useFixedLength ? (
            <NumberInput
              label="String Length"
              value={stringLength}
              onChange={(e) => setStringLength(Math.max(1, parseInt(e.target.value) || 1))}
              min={1}
              max={1000}
              helpText="Range: 1 to 1,000"
            />
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <NumberInput
                label="Min Length"
                value={stringMinLength}
                onChange={(e) => setStringMinLength(Math.max(1, parseInt(e.target.value) || 1))}
                min={1}
                max={1000}
                helpText="Min: 1"
              />
              <NumberInput
                label="Max Length"
                value={stringMaxLength}
                onChange={(e) => setStringMaxLength(Math.max(stringMinLength, parseInt(e.target.value) || 1))}
                min={stringMinLength}
                max={1000}
                helpText="Max: 1,000"
              />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="string-casing-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Casing</label>
          <select
            id="string-casing-select"
            value={stringCasing}
            onChange={(e) => setStringCasing(e.target.value as CharCasing)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
          >
            <option value="lowercase">Lowercase</option>
            <option value="uppercase">Uppercase</option>
            <option value="mixed">Mixed</option>
          </select>

          <div className="space-y-3">
            <Checkbox 
              label="Include Numbers (0-9)" 
              checked={includeNumbers} 
              onChange={(e) => setIncludeNumbers(e.target.checked)} 
            />
            <Checkbox 
              label="Include Special Characters" 
              checked={includeSpecialChars} 
              onChange={(e) => setIncludeSpecialChars(e.target.checked)} 
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="custom-charset" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Custom Character Set (Optional)
        </label>
        <input
          id="custom-charset"
          type="text"
          value={customCharset}
          onChange={(e) => setCustomCharset(e.target.value)}
          placeholder="e.g., abc123!@# (overrides other character options)"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          If provided, this will override all other character set options
        </p>
      </div>
    </div>
  );

  const summary = useMemo(() => {
    if (mainType === 'Array') {
      return (
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-gray-600 dark:text-gray-400">
          <span>Array Length: <span className="font-semibold text-blue-600 dark:text-blue-400">{arrayLength}</span></span>
          {(arraySubType === 'int' || arraySubType === 'double') && (
            <>
              <span>Min Value: <span className="font-semibold text-blue-600 dark:text-blue-400">{minValue}</span></span>
              <span>Max Value: <span className="font-semibold text-blue-600 dark:text-blue-400">{maxValue}</span></span>
            </>
          )}
          {(arraySubType === 'char' || arraySubType === 'string') && (
            <span>Casing: <span className="font-semibold text-blue-600 dark:text-blue-400 capitalize">{charCasing}</span></span>
          )}
          <span>Array Sort: <span className="font-semibold text-blue-600 dark:text-blue-400">{isSorted ? 'Yes' : 'No'}</span></span>
          <span>Allow Repeated: <span className="font-semibold text-blue-600 dark:text-blue-400">{allowRepeated ? 'Yes' : 'No'}</span></span>
        </div>
      );
    } else if (mainType === 'String') {
      return (
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-gray-600 dark:text-gray-400">
          {useFixedLength ? (
            <span>Length: <span className="font-semibold text-blue-600 dark:text-blue-400">{stringLength}</span></span>
          ) : (
            <span>Length: <span className="font-semibold text-blue-600 dark:text-blue-400">{stringMinLength}-{stringMaxLength}</span></span>
          )}
          <span>Casing: <span className="font-semibold text-blue-600 dark:text-blue-400 capitalize">{stringCasing}</span></span>
          <span>Numbers: <span className="font-semibold text-blue-600 dark:text-blue-400">{includeNumbers ? 'Yes' : 'No'}</span></span>
          <span>Special Chars: <span className="font-semibold text-blue-600 dark:text-blue-400">{includeSpecialChars ? 'Yes' : 'No'}</span></span>
          {customCharset && (
            <span>Custom Charset: <span className="font-semibold text-blue-600 dark:text-blue-400">Yes</span></span>
          )}
        </div>
      );
    }
    return null;
  }, [mainType, arrayLength, minValue, maxValue, isSorted, allowRepeated, arraySubType, charCasing, stringLength, stringMinLength, stringMaxLength, useFixedLength, stringCasing, includeNumbers, includeSpecialChars, customCharset]);

  return (
    <div className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16 w-full">
        <div className="flex items-center gap-4 mb-4">
          <Link 
            href="/tools"
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
            Test Case Generator
          </h1>
        </div>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          Create custom test data for your coding challenges and algorithm problems.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-8 w-full">
          {DATA_TYPES.map(type => (
            <GeneratorButton
              key={type}
              label={type}
              selected={mainType === type}
              onClick={() => setMainType(type)}
            />
          ))}
        </div>

        <div className="w-full p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Configure Your {mainType}
          </h2>
          
          {mainType === 'Array' && renderArrayOptions()}
          {mainType === 'String' && renderStringOptions()}

          {summary && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
              {summary}
            </div>
          )}

          <div className="flex justify-center mt-6">
            <button
              onClick={handleGenerate}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <RefreshCw className="w-5 h-5" />
              Generate
            </button>
          </div>

          <div className="relative mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Generated Output
            </label>
            <textarea
              value={generatedOutput}
              readOnly
              placeholder="Your generated test case will appear here..."
              rows={5}
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-y focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleCopyToClipboard}
              disabled={!generatedOutput}
              className="absolute top-8 right-3 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              title="Copy to clipboard"
            >
              <Copy className="w-5 h-5" />
              {showCopyTooltip && (
                <div className="absolute -top-8 -left-4 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg">
                  Copied!
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
