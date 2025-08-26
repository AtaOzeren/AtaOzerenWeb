# Button Component Documentation

Custom Button component with predefined variants for consistent styling across the application.

## Variants

### `ata-black`
- **Style**: Dark gradient background with white text
- **Use case**: Primary actions, main CTAs
- **Features**: Hover scale effect, shadow

### `ata-trans`
- **Style**: Transparent with white border
- **Use case**: Secondary actions, subtle CTAs
- **Features**: Hover background effect

## Usage Examples

### As Link
```tsx
import Button from '~/components/Button';

// Primary action button
<Button variant="ata-black" href="/projects">
  View My Projects
</Button>

// Secondary action button
<Button variant="ata-trans" href="/contact">
  Get In Touch
</Button>
```

### As Button
```tsx
// With click handler
<Button 
  variant="ata-black" 
  onClick={() => console.log('Clicked!')}
>
  Submit
</Button>

// Disabled state
<Button 
  variant="ata-trans" 
  disabled={true}
>
  Loading...
</Button>
```

### With Custom Styling
```tsx
<Button 
  variant="ata-black" 
  class="w-full md:w-auto"
  aria-label="Download my resume"
>
  Download Resume
</Button>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `variant` | `'ata-black' \| 'ata-trans'` | ✅ | Button style variant |
| `children` | `JSX.Element \| string` | ✅ | Button content |
| `href` | `string` | ❌ | URL for link buttons |
| `onClick` | `() => void` | ❌ | Click handler for button elements |
| `class` | `string` | ❌ | Additional CSS classes |
| `disabled` | `boolean` | ❌ | Disabled state |
| `aria-label` | `string` | ❌ | Accessibility label |

## Implementation Details

- **Responsive**: Works on all screen sizes
- **Accessible**: Supports ARIA labels and keyboard navigation
- **Flexible**: Can render as `<a>` or `<button>` based on props
- **Consistent**: Uses theme constants for styling
- **Performant**: Optimized for smooth animations

## Theme Integration

Button styles are defined in `src/constants/index.ts`:

```typescript
buttons: {
  variants: {
    'ata-black': '...',
    'ata-trans': '...',
  },
  base: 'px-8 py-3 rounded-lg font-semibold ...',
}
```
