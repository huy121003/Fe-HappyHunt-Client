import React, { useState, useEffect } from "react";
import { Slider, Flex, Card } from "antd";

interface PriceRangeProps {
  minValue?: number;
  maxValue?: number;
  onMinChange?: (value: number | undefined) => void;
  onMaxChange?: (value: number | undefined) => void;
  min?: number;
  max?: number;
  step?: number;
}

const CPriceRange: React.FC<PriceRangeProps> = ({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  min = 0,
  max = 1000000,
  step = 1000,
}) => {
  const [minPrice, setMinPrice] = useState<number | undefined>(minValue);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(maxValue);

  // Update component state when props change
  useEffect(() => {
    setMinPrice(minValue);
  }, [minValue]);

  useEffect(() => {
    setMaxPrice(maxValue);
  }, [maxValue]);

  // Calculate slider values for display
  const sliderValues: [number, number] = [minPrice ?? min, maxPrice ?? max];

  // Handle slider range change during sliding
  const handleSliderChange = (values: [number, number]) => {
    const [newMin, newMax] = values;
    setMinPrice(newMin);
    setMaxPrice(newMax);
  };

  // Handle slider range change after sliding stops
  const handleAfterChange = (values: [number, number]) => {
    const [newMin, newMax] = values;
    if (onMinChange) onMinChange(newMin);
    if (onMaxChange) onMaxChange(newMax);
  };

  return (
    <Card
      className="price-range-container border-0 bg-gray-100"
      size="small"
      bodyStyle={{ padding: 12 }}
    >
      <Flex vertical gap={16}>
        <Slider
          range
          min={min}
          max={max}
          step={step}
          value={sliderValues}
          onChange={handleSliderChange}
          onAfterChange={handleAfterChange}
          tooltip={{
            formatter: (value) => `${value?.toLocaleString() || 0}`,
          }}
          marks={{
            [min]: `${min.toLocaleString()}`,
            [max]: `${max.toLocaleString()}`,
          }}
        />
      </Flex>
    </Card>
  );
};

export default CPriceRange;
