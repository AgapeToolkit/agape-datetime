# @agape/datetime

Date and time utilities for TypeScript applications.

## ✨ Features

- Date manipulation and formatting
- Time zone handling
- Date arithmetic operations
- Date parsing and validation
- Relative time calculations

---

## 🚀 Example

```ts
import { formatDate, addDays, isWeekend } from '@agape/datetime';

const today = new Date();
const tomorrow = addDays(today, 1);
const formatted = formatDate(today, 'YYYY-MM-DD');

console.log(`Today: ${formatted}`);
console.log(`Is weekend: ${isWeekend(today)}`);
```

---

## 📚 Documentation

See the full API documentation at [agape.dev/api](https://agape.dev/api).

## 📦 Agape Toolkit

This package is part of the [Agape Toolkit](https://github.com/AgapeToolkit/AgapeToolkit) - a comprehensive collection of TypeScript utilities and libraries for modern web development.