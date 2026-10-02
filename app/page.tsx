'use client';

import React, { useState } from 'react';

export default function RationPlannerPage() {
  const [unitWeights] = useState({ concentrate: 50, silage: 37, hay: 420, straw: 445, tmr: 50 });

  const [tables] = useState([
    { id: 1, name: 'طاولة 1', category: 'كبير', heads: 189, conc: 0, hay: 0, straw: 0, tmr: 17.5 },
    { id: 6, name: 'طاولة 6', category: 'صغير', heads: 302, conc: 0, hay: 0, straw: 0, tmr: 13.7 },
    { id: 7, name: 'طاولة 7 البعيد', category: 'صغير', heads: 205, conc: 0, hay: 0, straw: 0, tmr: 13.7 },
    { id: 8, name: 'طاولة 8 القريب', category: 'وسط', heads: 174, conc: 0, hay: 0, straw: 0, tmr: 15.5 },
    { id: 9, name: 'طاولة 9 العيادة', category: 'عيادة', heads: 14, conc: 5, hay: 3, straw: 3, tmr: 0 },
    { id: 10, name: 'طاولة 10 جامبو', category: 'جامبو', heads: 0, conc: 0, hay: 0, straw: 0, tmr: 18.5 },
  ]);

  const totalHeads = tables.reduce((acc, t) => acc + t.heads, 0);
  const totalTmrKg = tables.reduce((acc, t) => acc + (t.tmr * t.heads), 0);

  return (
    <div style={{ padding: '24px', direction: 'rtl', fontFamily: 'sans-serif' }}>
      <h1>🍽️ حاسبة العلفة اليومية (أداة استدلالية مستقلة)</h1>
      <p>إجمالي القطيع النشط: <strong>{totalHeads} رأس</strong></p>
      <hr />
      <h3>إجمالي الـ TMR اليومي: {totalTmrKg.toLocaleString()} كجم</h3>
      <p>علفة الوجبة الواحدة: <strong>{(totalTmrKg / 2 / unitWeights.tmr).toFixed(2)} شكارة</strong></p>
    </div>
  );
}
