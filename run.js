const {pass, fail} = require('create-jest-runner-with-skip')

const {getLocalCypress} = require('./helpers/getLocalCypress')

module.exports = async ({testPath, config: {rootDir = process.cwd()}}) => {
  const cypress = getLocalCypress(rootDir)

  const start = +new Date()

  let results = await cypress.run({
    spec: testPath,
    reporter: 'junit'
  })

  const end = +new Date()

  if (results.failures) {
    return {
      ...fail({
        start, end, test: {
          path: testPath,
          errorMessage: 'Test failed, check screenshot and the video',
          title: 'Cypress Error'
        }
      }),
      numFailingTests: results.failures,
      numPassingTests: results.passes
    }
  } else {
    return {
      ...pass({start, end, test: {path: testPath}}),
      numPassingTests: results.passes
    }
  }

}
