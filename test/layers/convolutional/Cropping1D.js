describe('convolutional layer: Cropping1D', function() {
  const assert = chai.assert
  const styles = testGlobals.styles
  const logTime = testGlobals.logTime
  const stringifyCondensed = testGlobals.stringifyCondensed
  const approxEquals = KerasJS.testUtils.approxEquals
  const layers = KerasJS.layers

  const testParams = [
    { inputShape: [6, 4], attrs: { cropping: [1, 1] } },
    { inputShape: [6, 4], attrs: { cropping: [2, 3] } },
    { inputShape: [6, 4], attrs: { cropping: 2 } }
  ]

  before(function() {
    console.log('\n%cconvolutional layer: Cropping1D', styles.h1)
  })

  /*********************************************************
  * CPU
  *********************************************************/
  describe('CPU', function() {
    before(function() {
      console.log('\n%cCPU', styles.h2)
    })

    testParams.forEach(({ inputShape, attrs }, i) => {
      const key = `convolutional.Cropping1D.${i}`
      const title = `[${key}] [CPU] cropping ${JSON.stringify(attrs.cropping)} on ${JSON.stringify(inputShape)} input`

      it(title, function() {
        console.log(`\n%c${title}`, styles.h3)
        let testLayer = new layers.Cropping1D(attrs)
        let t = new KerasJS.Tensor(TEST_DATA[key].input.data, TEST_DATA[key].input.shape)
        console.log('%cin', styles.h4, stringifyCondensed(t.tensor))
        const startTime = performance.now()
        t = testLayer.call(t)
        const endTime = performance.now()
        console.log('%cout', styles.h4, stringifyCondensed(t.tensor))
        logTime(startTime, endTime)
        const dataExpected = new Float32Array(TEST_DATA[key].expected.data)
        const shapeExpected = TEST_DATA[key].expected.shape
        assert.deepEqual(t.tensor.shape, shapeExpected)
        assert.isTrue(approxEquals(t.tensor, dataExpected))
      })
    })
  })

  /*********************************************************
  * GPU
  *********************************************************/
  describe('GPU', function() {
    before(function() {
      console.log('\n%cGPU', styles.h2)
    })

    testParams.forEach(({ inputShape, attrs }, i) => {
      const key = `convolutional.Cropping1D.${i}`
      const title = `[${key}] [GPU] cropping ${JSON.stringify(attrs.cropping)} on ${JSON.stringify(inputShape)} input`

      it(title, function() {
        console.log(`\n%c${title}`, styles.h3)
        let testLayer = new layers.Cropping1D(Object.assign(attrs, { gpu: true }))
        let t = new KerasJS.Tensor(TEST_DATA[key].input.data, TEST_DATA[key].input.shape)
        console.log('%cin', styles.h4, stringifyCondensed(t.tensor))
        const startTime = performance.now()
        t = testLayer.call(t)
        const endTime = performance.now()
        console.log('%cout', styles.h4, stringifyCondensed(t.tensor))
        logTime(startTime, endTime)
        const dataExpected = new Float32Array(TEST_DATA[key].expected.data)
        const shapeExpected = TEST_DATA[key].expected.shape
        assert.deepEqual(t.tensor.shape, shapeExpected)
        assert.isTrue(approxEquals(t.tensor, dataExpected))
      })
    })
  })
})
