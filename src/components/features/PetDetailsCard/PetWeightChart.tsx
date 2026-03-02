'use client'

// TODO: refactor component
import { memo, useMemo } from 'react'

import { usePetStore } from '@/entities/pet/pet.store'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export const PetWeightChart = memo(() => {
  const t = useTranslations('petDetailsPage.chart')

  const { id } = useParams()
  const pet = usePetStore((state) => state.pets.find((pet) => pet.id === id))

  const sortedData = useMemo(() => {
    if (!pet) return []
    if (!pet.weightHistory) return []
    return [...pet.weightHistory]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((item) => ({
        ...item,
        formattedDate: new Date(item.date).toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
        }),
      }))
  }, [pet])

  if (!pet) {
    return null
  }

  if (pet.weightHistory?.length === 0) {
    return (
      <div className='flex h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-600 bg-gray-50/50 p-6 text-center text-gray-400'>
        <p className='text-sm'>{t('noData')}</p>
      </div>
    )
  }

  if (Array.isArray(pet.weightHistory) === false) {
    return (
      <div className='flex h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-600 bg-gray-50/50 p-6 text-center text-gray-400'>
        <p className='text-sm'>Something went wrong. Please try again</p>
      </div>
    )
  }

  return (
    <div className='h-72 w-full rounded-xl border border-gray-600 py-4'>
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart
          data={sortedData}
          margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id='weightGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#1f9e85' stopOpacity={0.5} />
              <stop offset='95%' stopColor='#1f9e85' stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray='4 4'
            vertical={false}
            stroke='#b0b0b0'
            opacity={0.4}
          />

          <XAxis
            dataKey='formattedDate'
            axisLine={true}
            tickLine={true}
            tick={{ fontSize: 12, fill: '#000' }}
            dy={5}
          />

          <YAxis
            axisLine={true}
            tickLine={true}
            tick={{ fontSize: 12, fill: '#000' }}
            domain={['dataMin - 0.5', 'dataMax + 0.5']}
          />

          <Tooltip
            contentStyle={{
              borderRadius: '12px',
              border: 'none',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.3)',
            }}
            labelStyle={{ color: '#9ca3af', fontSize: '12px' }}
            itemStyle={{ fontWeight: 'bold' }}
            formatter={(value: string | number | undefined) => {
              if (value === undefined) return ['', '']
              return [`${value}`, t('weight')]
            }}
          />

          {/* TODO: add target point */}

          <Area
            type='linear'
            dataKey='weight'
            stroke='#047857'
            strokeWidth={3}
            fillOpacity={1}
            fill='url(#weightGradient)'
            dot={{ r: 4, fill: '#188975', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
})

PetWeightChart.displayName = 'PetWeightChart'
