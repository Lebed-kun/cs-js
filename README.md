GOALS:
  1. Create HTML element with attributes, event listeners and child components/texts;
  2. Update HTML element by diffing trees;
  3. Common store with data shared by different components
  
  TREE:
  1. type - name of HTML element (for simplicity now);
  2. children - other components, texts etc.
  
  CHILDREN TYPE:
  1. Component - HTML element with attrs and listeners;
  2. function - event listener of parent;
  3. object (not null) - attrs of parent;
  4. default (neither null nor undefined) - text content of parent
  
  NOTES: 
  1. Children of node and children of component are different. This allows to use children for business logic;

  DIFFING (currTree and prevTree):
  1. If types are different then create element and replace with them previous one;