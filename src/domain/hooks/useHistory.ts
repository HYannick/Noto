import {useEffect} from 'react';

export const useHistory = (key: string, state: any, cb:() => void) => {
  useEffect(() => {
    let tempState = state;
    history.pushState({[key]: state}, '');
    window.addEventListener('popstate', async () => {
      if(tempState) {
        await cb();
        tempState = null;
      }
      history.replaceState({}, '');
    });
  }, [state]);

  useEffect(() => {
    return () => {
      window.removeEventListener('popstate', () => {});
    }
  }, []);
}