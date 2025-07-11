"use client";

import React from "react";
import { Icon1 } from "./Icon1";
import { Icon2 } from "./Icon2";
import { Icon3 } from "./Icon3";
import { Icon4 } from "./Icon4";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BabyFootPositionProps {
  selectedPosition?: keyof typeof POSITIONS;
  onPositionChange?: (position: keyof typeof POSITIONS) => void;
  className?: string;
}

/**
 * All the foosball positions with their properties
 */
export const POSITIONS = {
  GOAL: {
    code: "GK",
    name: "Gardien",
    description: "1 gardien de but",
    playerCount: 1,
    color: "#EA1846"
  },
  DEFENSE: {
    code: "DF",
    name: "Défense",
    description: "2 joueurs en défense",
    playerCount: 2,
    color: "#EA1846"
  },
  MIDFIELD: {
    code: "MF",
    name: "Milieu",
    description: "5 joueurs au milieu",
    playerCount: 5,
    color: "#EA1846"
  },
  ATTACK: {
    code: "AT",
    name: "Attaque",
    description: "3 joueurs en attaque",
    playerCount: 3,
    color: "#EA1846"
  }
} as const;

/**
 * Interactive foosball table component for position selection
 * @param {Object} props - component props
 * @param {keyof typeof POSITIONS} props.selectedPosition - currently selected position
 * @param {function} props.onPositionChange - callback when position changes
 * @param {string} props.className - optional CSS classes
 * @returns {JSX.Element} - clickable foosball table with navigation arrows
 */
export default function BabyFootPosition({ 
  selectedPosition = 'GOAL', 
  onPositionChange,
  className 
}: BabyFootPositionProps) {
  const positionKeys = Object.keys(POSITIONS) as (keyof typeof POSITIONS)[];
  
  /**
   * Cycles through positions with arrow navigation
   * @param {'prev'|'next'} direction - which way to navigate
   */
  const navigatePosition = (direction: 'prev' | 'next') => {
    if (!onPositionChange) return;
    
    const currentIndex = positionKeys.indexOf(selectedPosition);
    let newIndex: number;
    
    if (direction === 'next') {
      newIndex = currentIndex < positionKeys.length - 1 ? currentIndex + 1 : 0;
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : positionKeys.length - 1;
    }
    
    onPositionChange(positionKeys[newIndex]);
  };

  /**
   * Gets the X position for each foosball rod based on real table layout
   * @param {string} code - position code (GK, DF, MF, AT)
   * @returns {number} - X pixel position
   */
  const getPositionX = (code: string) => {
    switch (code) {
      case "GK": return 50;
      case "DF": return 90;
      case "MF": return 127;
      case "AT": return 190;
      default: return 127;
    }
  };

  /**
   * Calculates player positions based on how many players are on that rod
   * @param {number} playerCount - number of players on this rod
   * @param {number} baseX - X position of the rod
   * @returns {Array} - array of {x, y} positions for each player
   */
  const getPlayerPositions = (playerCount: number, baseX: number) => {
    const centerY = 79;
    
    switch (playerCount) {
      case 1:
        return [{ x: baseX, y: centerY }];
      
      case 2:
        return [
          { x: baseX, y: centerY - 25 },
          { x: baseX, y: centerY + 25 }
        ];
      
      case 3:
        return [
          { x: baseX, y: centerY - 30 },
          { x: baseX, y: centerY },
          { x: baseX, y: centerY + 30 }
        ];
      
      case 5:
        return [
          { x: baseX, y: centerY - 40 },
          { x: baseX, y: centerY - 20 },
          { x: baseX, y: centerY },
          { x: baseX, y: centerY + 20 },
          { x: baseX, y: centerY + 40 }
        ];
      
      default:
        return [{ x: baseX, y: centerY }];
    }
  };

  /**
   * Generates all the position data with player positions for rendering
   */
  const allPositionsData = Object.entries(POSITIONS).map(([key, pos]) => {
    const baseX = getPositionX(pos.code);
    const playerPositions = getPlayerPositions(pos.playerCount, baseX);
    const isSelected = key === selectedPosition;
    
    return {
      key: key as keyof typeof POSITIONS,
      baseX,
      playerPositions,
      isSelected
    };
  });

  const selectedPos = POSITIONS[selectedPosition];

  return (
    <div className={`flex items-center justify-center space-x-6 ${className || ''}`}>
      {onPositionChange && (
        <button
          onClick={() => navigatePosition('prev')}
          className="p-3 hover:bg-[#EA1846]/10 rounded-full transition-colors duration-200"
        >
          <ChevronLeft className="h-8 w-8 text-[#EA1846]" />
        </button>
      )}
      
            <div className="shadow-none w-[281px] h-[243px] justify-self-center self-center grid-cols-auto min-h-[243px] rounded-[12px] text-white text-base leading-normal font-['IBM_Plex_Sans',-apple-system,BlinkMacSystemFont,'Segoe_UI',Helvetica,Arial,sans-serif,'Apple_Color_Emoji','Segoe_UI_Emoji'] transition-all duration-300">
        <div className="h-[243px]">
          <div className="flex flex-col justify-between h-[243px]">
            <div className="flex justify-center p-3">
              <div className="relative flex w-[255px]">
                <Icon2 className="absolute top-0 left-0 text-[rgb(55,57,66)] w-[255px] h-[159.125px]" />
                <Icon3 className="text-[rgb(55,57,66)] w-[255px] h-[159.125px]" />
                
                {allPositionsData.map(({ key, baseX, playerPositions, isSelected }) => (
                  <React.Fragment key={key}>
                    <button
                      onClick={() => onPositionChange?.(key)}
                      disabled={!onPositionChange}
                      className={`absolute w-[2px] h-[159px] transition-all duration-500 cursor-pointer hover:opacity-80 ${
                        isSelected 
                          ? 'bg-[#EA1846] opacity-100' 
                          : 'bg-white opacity-20 hover:opacity-40'
                      }`}
                      style={{ 
                        left: `${baseX}px`, 
                        top: '0px',
                        transform: 'translateX(-1px)'
                      }}
                    />
                    
                    {playerPositions.map((player, index) => (
                      <button
                        key={`${key}-${index}`}
                        onClick={() => onPositionChange?.(key)}
                        disabled={!onPositionChange}
                        className={`h-2 w-2 absolute border border-transparent rounded-full p-0 transform -translate-x-1 -translate-y-1 transition-all duration-500 cursor-pointer ${
                          isSelected 
                            ? 'bg-[#EA1846] animate-pulse opacity-100 scale-110' 
                            : 'bg-[rgb(230,231,235)] opacity-30 hover:opacity-60 hover:scale-105'
                        }`}
                        style={{
                          left: `${player.x}px`,
                          top: `${player.y}px`
                        }}
                      >
                        <span className={`box-border font-['IBM_Plex_Sans',-apple-system,BlinkMacSystemFont,'Segoe_UI',Helvetica,Arial,sans-serif,'Apple_Color_Emoji','Segoe_UI_Emoji'] bg-transparent h-4 w-4 absolute cursor-pointer top-[3px] transform translate-x-[-8px] translate-y-[-8px] left-[3px] border rounded-full p-0 transition-all duration-500 ${
                          isSelected 
                            ? 'border-[#EA1846] opacity-100' 
                            : 'border-[rgb(230,231,235)] opacity-30 hover:opacity-60'
                        }`}></span>
                      </button>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
            
            <div className="flex items-center select-none px-3 pb-3 pt-0">
              <div className="flex relative flex-shrink-0 w-8 h-9 items-center flex-col justify-center">
                <Icon4 className="absolute top-0 left-0 w-8 h-9" style={{ color: selectedPos.color }} />
                <p className="font-medium leading-[17.5px] relative text-center text-xs m-0 p-0 text-white">
                  {selectedPos.code}
                </p>
              </div>
              <div className="flex flex-col pl-3">
                <p className="font-medium leading-[21px] text-white text-sm m-0 p-0">
                  {selectedPos.name}
                </p>
                <p className="font-normal leading-[21px] text-white text-sm m-0 p-0">
                  {selectedPos.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {onPositionChange && (
        <button
          onClick={() => navigatePosition('next')}
          className="p-3 hover:bg-[#EA1846]/10 rounded-full transition-colors duration-200"
        >
          <ChevronRight className="h-8 w-8 text-[#EA1846]" />
        </button>
      )}
    </div>
  );
} 