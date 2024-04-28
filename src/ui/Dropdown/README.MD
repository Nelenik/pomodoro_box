## Dropdown компонент

Компонент создает выпадающий список, элементы выпадающего списка могут быть кнопками или ссылками, реализовано переключение фокуса внутри списка с помощью стрелок вверх и вниз, нажание на Esc и Tab закрывает меню,

### Props

`index` - type?: string - идентификатор дропдауна (можно передать например числов в виде строки или id элемента), добавляется к id html элемента, чтобы избежать повторения, в случае если есть несколько выпадающих списков

`isActiveDropdown` - type?:boolean - параметр нужен в случае нескольких меню, если необходимо чтобы было одновременно открыто только одно из них

`dropdownOnClick` - type?: ()=>void- данный параметр идет в паре с isActiveDropdown и передает наверх переключение состояния активного дропдауна
 
`As` - type?: 'a'|'button' - можно указать каким HTML элементом будут элементы меню

`additCss` - type?: {dropdownCss?:string, triggerCss?:string, menuCss?:string, itemCss?:string} - в объекте можно передать дополнительные css классы для частей дропдауна

`triggerInner` - type:any - передаем содержимое кнопки триггера. 

`list` = type: ({id:string, inner: ReactNode, itemOnClick?:()=>void})[] - это массив объектов, содержащий содержимое элемента меню, идентификатор для key, и коллбэк реализующий действие при клике на соответствующий элемент.

### Пример
 ```javascript
    const list = [
    {
        id: generateId(),
        inner: 'first item',
        itemOnClick: () => console.log('item clicked')
    },
    {
        id: generateId(),
        inner: 'second item'
    }
]
    const Parent = ()=> {
      const[activeIndex, setActiveIndex] = useState(-1)
      return(
        <>
        <Dropdown
                isActiveDropdown={activeIndex === 0}
                dropdownOnClick={() => { setActiveIndex(0) }}
                triggerInnerInner={<span>Span</span>}
                list={list}
            />
            <Dropdown
                isActiveDropdown={activeIndex === 1}
                dropdownOnClick={() => { setActiveIndex(1) }}
                triggerInnerInner={<span>Span</span>}
                list={list}
            />
        </>
      )
    }
  ```