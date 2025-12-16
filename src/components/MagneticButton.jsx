import React, { useRef, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { gsap } from 'gsap';

const buttonClasses = cva(
  'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-95',
  {
    variants: {
      variant: {
        primary: 'focus:ring-orange-500',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
        outline: 'border-2 bg-transparent hover:bg-opacity-10 focus:ring-orange-500',
      },
      size: {
        small: 'text-sm px-3 py-1.5',
        medium: 'text-base px-4 py-2',
        large: 'text-lg px-6 py-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

const MagneticButton = ({
  // Required parameters with defaults
  text = "Menu",
  text_font_size = "16",
  text_font_family = "Inter Variable",
  text_font_weight = "400",
  text_line_height = "20px",
  text_text_align = "left",
  text_color = "#ffffff",
  fill_background_color = "#ff4920",
  
  // Optional parameters (no defaults)
  border_border,
  border_border_radius,
  layout_width,
  padding,
  position,
  
  // Magnetic effect toggle
  magnetic = true,
  magneticStrength = 0.3,
  
  // Standard React props
  variant,
  size,
  disabled = false,
  className,
  children,
  onClick,
  type = "button",
  ...props
}) => {
  // Refs for magnetic effect
  const buttonRef = useRef(null);
  const contentRef = useRef(null);

  // GSAP Magnetic Effect
  useEffect(() => {
    if (!magnetic || disabled) return;

    const button = buttonRef.current;
    const content = contentRef.current;

    if (!button || !content) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * magneticStrength;
      const deltaY = (e.clientY - centerY) * magneticStrength;

      gsap.to(button, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(content, {
        x: deltaX * 0.5,
        y: deltaY * 0.5,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });

      gsap.to(content, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [magnetic, magneticStrength, disabled]);

  // Safe validation for optional parameters
  const hasValidBorder = border_border && typeof border_border === 'string' && border_border?.trim() !== '';
  const hasValidBorderRadius = border_border_radius && typeof border_border_radius === 'string' && border_border_radius?.trim() !== '';
  const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width?.trim() !== '';
  const hasValidPadding = padding && typeof padding === 'string' && padding?.trim() !== '';
  const hasValidPosition = position && typeof position === 'string' && position?.trim() !== '';

  // Build optional Tailwind classes
  const optionalClasses = [
    hasValidWidth ? (layout_width === 'auto' ? 'w-auto' : `w-[${layout_width}]`) : '',
    hasValidPadding ? `p-[${padding}]` : '',
    hasValidPosition ? position : '',
    hasValidBorderRadius ? `rounded-[${border_border_radius}]` : '',
  ]?.filter(Boolean)?.join(' ');

  // Build inline styles for required parameters
  const buttonStyles = {
    fontSize: text_font_size ? `${text_font_size}px` : '16px',
    fontFamily: text_font_family || 'Inter Variable',
    fontWeight: text_font_weight || '400',
    lineHeight: text_line_height || '20px',
    textAlign: text_text_align || 'left',
    color: text_color || '#ffffff',
    backgroundColor: fill_background_color || '#ff4920',
    ...(hasValidBorder && { border: border_border }),
  };

  // Safe click handler
  const handleClick = (event) => {
    if (disabled) return;
    if (typeof onClick === 'function') {
      onClick(event);
    }
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onClick={handleClick}
      style={buttonStyles}
      className={twMerge(
        'relative',
        buttonClasses({ variant, size }),
        optionalClasses,
        className
      )}
      aria-disabled={disabled}
      {...props}
    >
      <span ref={contentRef} className="block">
        {children || text}
      </span>
    </button>
  );
};

export default MagneticButton;