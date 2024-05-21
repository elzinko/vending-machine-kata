module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    paths: ['features/*.feature'],
    require: ['features/step-definitions/**/*.ts'],
  },
};
