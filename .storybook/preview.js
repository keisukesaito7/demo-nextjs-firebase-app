import * as nextImage from 'next/image'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: {
      iphone5S: {
        name: 'iPhone 5S・SE1',
        styles: {
          width: '320px',
          height: '568px'
        }
      },
      iphone8: {
        name: 'iPhone 8・SE2',
        styles: {
          width: '375px',
          height: '667px'
        }
      }
    }
  }
}

Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: (props) => {
    const { width, height } = props
    const ratio = (height / width) * 100
    return (
      <div
        style={{
          paddingBottom: `${ratio}%`,
          position: 'relative'
        }}
      >
        <img
          style={{
            objectFit: 'cover',
            position: 'absolute',
            width: '100%',
            height: '100%'
          }}
          {...props}
        />
      </div>
    )
  }
})
