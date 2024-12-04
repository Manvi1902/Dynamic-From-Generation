import  { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import JSONEditor from './components/JSONEditor';
import FormGenerator from './components/FormGenerator';
import { FormSchema } from './models/Form.models';

const App: React.FC = () => {
  const [schema, setSchema] = useState<FormSchema | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);

 
  // Toggle dark mode and store preference in localStorage
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Load the theme preference from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <>
     <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
     <div className=" flex flex-col items-center pt-5 w-full h-[100px] bg-yellow-200">
            <h2 className="text-lg font-bold">Want to Generate a dynamic form ?</h2>
            <p className="text-gray-800 mt-2">Enter a valid JSON schema to see the form preview.</p>
      </div>


      <div className="container flex flex-col sm:flex-row ">
      <JSONEditor onChange={setSchema} />
      {schema ? (
        <FormGenerator schema={schema} />
      ) : (
        <div className="w-full lg:w-[120vw] h-[100vh] bg-blue-50 p-4">
          <h2 className="text-lg font-bold">Dynamic Generated Form</h2>
        
        </div>
      )}
    </div>
    </>
  );
};

export default App;

