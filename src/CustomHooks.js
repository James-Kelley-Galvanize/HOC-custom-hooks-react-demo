import { useState } from "react";

function useBetterState(initialState = {}) {
  const [state, overwriteState] = useState(initialState); // make a hook-based state and setter

  // Let's make a better state setter function that does more than overwrite the state value, so it's easier to call it with the syntax you can call Component.setState with.
  function setState(stateUpdateObject, callback = () => {}) {
    // this imitates the setState method on React's Component class, making use of the hook
    const newState = { ...state, ...stateUpdateObject }; // spread the old state and then the incoming state together to create a distinct newState object.  StateUpdateObject's keys/values will overwrite matching keys/values on the old state
    overwriteState(newState); // set the hook-based state with the new object
    callback(newState); // do the callback (if provided, otherwise substitute in the default parameter)
    return newState; // return the newState - this is helpful since the overwriteState may not be TECHNICALLY done when this returns.  The callback is also useful for the same reason: all of them are being passed the same newState object, so the callback and return are not dependending on the hook-based 'state' changing asynchronously before they can proceed since they are passed the same info 'sort of synchronously' (it's still React, after all).
  }
  return [state, setState]; // return the state and the customized setter function we wrote!
}

export default useBetterState;
