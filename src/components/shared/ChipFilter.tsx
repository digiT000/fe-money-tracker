import React from 'react';

interface ChipFilterProps {
  name: string;
  isActive: boolean;
  id: string;
  onClick: (value: string) => void;
}

function ChipFilter({ isActive, name, id, onClick }: ChipFilterProps) {
  function handleClick() {
    onClick(id);
  }
  return (
    <button
      onClick={handleClick}
      className={`cursor-pointer border-none text-sm text-neutral-900 px-4 py-2 hover:bg-[#005B5E15] ${isActive ? 'bg-[#005B5E] text-white hover:bg-[#005B5E]' : ''}`}
    >
      {name}
    </button>
  );
}

export default ChipFilter;
