const uuid = require('uuid/v4')

const { config } = require('./preamble')
const VideoCatalogControls = require('../src/catalog-component/controls/commands/catalog')

const catalog = VideoCatalogControls.example()

config.catalogComponent.commandHandlers
  .Catalog(catalog)
  .then(() => config.catalogComponent.commandHandlers.Catalog(catalog))
  .then(() => console.log('Catalog process started.'))
  .finally(config.messageStore.stop)
