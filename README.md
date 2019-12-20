GOALS:
  1. Create HTML element with attributes, event listeners and child components/texts; // +++
  2. Update HTML element by diffing trees; // +++
  3. Common store with data shared by different components;
  4. SSR friendly;
  5. Mounted life-cycle method;
  6. Updated life-cycle method
  
  TREE:
  1. type - name of HTML element (for simplicity now);
  2. attrs - attributes of HTML element;
  3. listeners - event listeners of HTML element;
  4. children - another components, or component-convertable, or string-convertable

  DIFFING:
  1. If types of trees are different then create new element and replace old one with it;
  2. Diff attributes. Change only attributes which value is changed;
 