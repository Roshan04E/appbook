# To create a window from anywher

- create a component
- use the windowContext
  - const {open} = useWindows()
- create a button as follows

```
    <Button onClick={() => open('signIn')}>
	<User size={24} />
    </Button>
```

- and finally register your app id in window manager inside the registry

An example to open and restore and with peristance

```
'use client'

import { Button } from "@/components/ui/button"
import { useWindows } from "@/context/windowContext"
import { User } from "lucide-react"

const SignInPage = () => {
  const { windows, open, restore } = useWindows()

  const win = windows.find(w => w.app === 'signIn')

  return (
    <div>
      <h2>Sign In</h2>

      <Button onClick={() => open('signIn')}>
        <User size={24} />
      </Button>

      <Button 
        onClick={() => win && restore(win.id)}
        disabled={!win}
      >
        Restore
      </Button>
    </div>
  )
}

export default SignInPage


```



---

# **Using the custom ` useMediaQuery( ) `**
lets say to find the width of the app, not browser.. and it will behave as if the given reference of html element like a mini window from where we can query different media queries

simple..
- call it through useWindow Context
```
  const { appWindowRef } = useWindows();
```
- provide the refernce to the mediaQuery
```
  const isMobile = useMediaQuery(appWindowRef, 640);
```
- it will return **true** if the app width is less than 640
