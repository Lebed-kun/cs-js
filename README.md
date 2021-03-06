# GOALS:
  1. Create HTML element with attributes, event listeners and child components/texts; // +++
  2. Update HTML element by diffing trees; // +++
  3. Store with state and dispatching events; // +++
  4. SSR friendly; // +++
  5. Mounted life-cycle method; // +++
  6. Updated life-cycle method // +++
  7. Unmounted life-cycle method // +++
  8. HTML components; // +++
  9. Frontend router; // +++
  
# TREE:
  1. type - name of HTML element (for simplicity now);
  2. attrs - attributes of HTML element;
  3. listeners - event listeners of HTML element;
  4. children - another components, or component-convertable, or string-convertable

# DIFFING:
  1. If there's not previous child, insert created element before current position;
  2. If there's not current child, delete element at current position;
  3. If types of trees are different then create new element and replace old one with it;
  4. Otherwise diff attributes/listeners. Change only attributes/listeners which value is changed;
  5. And diff children. Update each child recursively;
  6. If there's specified element (by key) then swap it with previous element

# SSR:
  1. Render component as HTML-string;
  2. Hydrate component into HTML-template attaching listeners;
 
# Unmounted lify-cycle method is called when:
  1. Page destructs (tab closed, reloaded, returned to previous page);
  2. Element of component is removed from DOM

# Frontend router:
  1. Component can be executed with additional props, root/template;
  2. If link pattern is not specified then component executes;
  3. If link pattern is specified and browser pathname matches the pattern then component executes with path and query params;

# Notes on Store:
1. Main purpose of store to share data between mini-frontends (ex. task list and notifications tab);
2. So avoid using same state property in different trees to avoid unexpected behavior. For example, if app has comment list and comment counter, and the last thing also depends on comments array of store, then the counter won't rerender if it's subscribed to "add comment" event later than the list. To solve this problem either use different state properties for comment list and counter. Or subscribe parent to changing 'comments' property and just pass comments data to the list and comments count to the counter from the parent;
3. If there's direct connection between parent component and its child which has event listener, and some data is bound only to parent, better pass event handler changing parent's props to child component; 