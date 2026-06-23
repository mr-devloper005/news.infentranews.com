import { siteIdentity } from '@/config/site.identity'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'

const { recipe } = getFactoryState()
const productKind = getProductKind(recipe)

export const slot4BrandConfig = {
  siteName: siteIdentity.name,
  tagline: siteIdentity.tagline,
  domain: siteIdentity.domain,
  baseUrl: siteIdentity.url,
  productKind,
  ogImage: siteIdentity.ogImage,
  accents:
    productKind === 'visual'
      ? { primary: '#995f2f', surface: '#16373a' }
      : productKind === 'editorial'
        ? { primary: '#622b14', surface: '#fbf8f2' }
        : productKind === 'directory'
          ? { primary: '#16373a', surface: '#f6f1e7' }
          : { primary: '#995f2f', surface: '#f6f1e7' },
} as const
