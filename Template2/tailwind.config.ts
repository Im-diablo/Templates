import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					glow: 'hsl(var(--secondary-glow))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					glow: 'hsl(var(--accent-glow))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
					glow: 'hsl(var(--card-glow))'
				}
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-secondary': 'var(--gradient-secondary)',
				'gradient-hero': 'var(--gradient-hero)'
			},
			boxShadow: {
				'glow-primary': 'var(--glow-primary)',
				'glow-secondary': 'var(--glow-secondary)',
				'glow-accent': 'var(--glow-accent)',
				'3d': '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 30px rgba(59, 130, 246, 0.3)',
				'3d-hover': '0 35px 60px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(59, 130, 246, 0.4)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'monospace']
			},
			keyframes: {
				// Accordion
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				// 3D Animations
				'float': {
					'0%, 100%': { transform: 'translateY(0px) rotateX(0deg)' },
					'50%': { transform: 'translateY(-20px) rotateX(5deg)' }
				},
				'rotate-3d': {
					'0%': { transform: 'rotateX(0deg) rotateY(0deg)' },
					'25%': { transform: 'rotateX(15deg) rotateY(90deg)' },
					'50%': { transform: 'rotateX(0deg) rotateY(180deg)' },
					'75%': { transform: 'rotateX(-15deg) rotateY(270deg)' },
					'100%': { transform: 'rotateX(0deg) rotateY(360deg)' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						'box-shadow': '0 0 20px hsl(var(--primary) / 0.3)',
						'border-color': 'hsl(var(--primary) / 0.5)'
					},
					'50%': { 
						'box-shadow': '0 0 40px hsl(var(--primary) / 0.6)',
						'border-color': 'hsl(var(--primary))'
					}
				},
				'slide-in-3d': {
					'0%': { 
						transform: 'translateX(-100px) rotateY(-30deg)',
						opacity: '0'
					},
					'100%': { 
						transform: 'translateX(0) rotateY(0deg)',
						opacity: '1'
					}
				},
				'particle-float': {
					'0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
					'33%': { transform: 'translate(30px, -30px) rotate(120deg)' },
					'66%': { transform: 'translate(-20px, 20px) rotate(240deg)' }
				},
				'hologram': {
					'0%, 100%': { 
						'background-position': '0% 50%',
						'filter': 'hue-rotate(0deg)'
					},
					'50%': { 
						'background-position': '100% 50%',
						'filter': 'hue-rotate(180deg)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'rotate-3d': 'rotate-3d 10s linear infinite',
				//'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'slide-in-3d': 'slide-in-3d 0.8s ease-out',
				'particle-float': 'particle-float 8s ease-in-out infinite',
				//'hologram': 'hologram 4s ease-in-out infinite'
			},
			perspective: {
				'1000': '1000px',
				'2000': '2000px'
			},
			transformStyle: {
				'preserve-3d': 'preserve-3d'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
