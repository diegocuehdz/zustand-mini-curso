import { useShallow } from 'zustand/shallow';
import { WhiteCard } from '../../components';
import { useBearStore } from '../../stores';

export const BearPage = () => {
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <BlackBears/>
        <PolarBears/>
        <PandaBears/>
        <BearDisplay/>
      </div>
    </>
  );
};


export const BlackBears = () => {
  const blackBears = useBearStore((state) => state.blackBears);
  const increaseBlackBears = useBearStore((state) => state.increaseBlackBears);

  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>
      <div className="flex flex-col md:flex-row">
        <button onClick={() => increaseBlackBears(+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {blackBears} </span>
        <button onClick={() => { increaseBlackBears(-1)}}>-1</button>
      </div>
    </WhiteCard>
  )
}

export const PolarBears = () => {
  const polarBears = useBearStore((state) => state.polarBears)
  const increasePolarBears = useBearStore((state) => state.increasePolarBears)

  // This causes the component to re-render because your subscribing to the whole state changes not just what you're interested
  // const { polarBears, increasePolarBears} = useBearStore((state) => state)

  return (
    <WhiteCard centered>
      <h2>Osos Polares</h2>
      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasePolarBears(+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {polarBears} </span>
        <button onClick={() => increasePolarBears(-1)}>-1</button>
      </div>
    </WhiteCard>
  )
}

export const PandaBears = () => {
  const pandaBears = useBearStore((state) => state.pandaBears)
  const increasePandaBears = useBearStore((state) => state.increasePandaBears)

  return (
    <WhiteCard centered>
      <h2>Osos Pandas</h2>
      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasePandaBears(+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> { pandaBears} </span>
        <button onClick={() => increasePandaBears(+1)}>-1</button>
      </div>
    </WhiteCard>
  )
}



export const BearDisplay = () => {
  // Using shallow comparison to avoid unnecessary re-renders, compares object and if they are the same it won't re-render
  // const bears = useBearStore(useShallow((state) => state.bears));

  const bears = useBearStore((state) => state.bears);

  const doNothing = useBearStore((state) => state.doNothing);
  const addBear = useBearStore((state) => state.addBear);
  const clearBears = useBearStore((state) => state.clearBears);

  return (
    <WhiteCard >
      <h2>Osos</h2>
      <button onClick={() => doNothing()}>Do Nothing</button>
      <button className='mt-2' onClick={() => addBear()}>Add Bear</button>
      <button className='mt-2' onClick={() => clearBears()}>Clear Bears</button>
      <pre>{JSON.stringify(bears, null, 2)}</pre>
    </WhiteCard>
  )
}
