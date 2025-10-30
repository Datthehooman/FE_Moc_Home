// composables/useMainSlider.ts
import { ref } from 'vue'

export const useMainSlider = (images: string[]) => {
  const currentIndex = ref(0)
  const nextIndex = ref<number | null>(null)
  const animating = ref(false)
  const direction = ref<'left' | 'right'>('left')
  const incomingAtCenter = ref(false)

  const startAnimation = (targetIndex: number) => {
    animating.value = true
    nextIndex.value = targetIndex
    incomingAtCenter.value = false
    setTimeout(() => (incomingAtCenter.value = true), 20)
    setTimeout(() => {
      currentIndex.value = targetIndex
      animating.value = false
      nextIndex.value = null
      incomingAtCenter.value = false
    }, 520)
  }

  const goNext = () => {
    if (animating.value) return
    direction.value = 'left'
    startAnimation((currentIndex.value + 1) % images.length)
  }

  const goPrev = () => {
    if (animating.value) return
    direction.value = 'right'
    startAnimation((currentIndex.value - 1 + images.length) % images.length)
  }

  const changeImage = (i: number) => {
    if (animating.value || i === currentIndex.value) return
    direction.value = i > currentIndex.value ? 'left' : 'right'
    startAnimation(i)
  }

  return {
    currentIndex,
    nextIndex,
    animating,
    direction,
    incomingAtCenter,
    goNext,
    goPrev,
    changeImage,
  }
}
