# CLOUD VPN Team Onboarding Component

React component for explaining functionality to new users in Cloud VPN account.

## Setup
Component can be installed from MTS private nexus repo.
```bash
npm i onboarding-cvpn
```

## Getting Started
```jsx
import Onboarding from 'onboarding-cvpn';

const myOwnComponent = (props) => {
    const { steps } = props;

    return (
      <div className="app">
        <Onboarding
          steps={steps}
          ...
        />
        ...
      </div>
    );
};
```
As component uses external CSS don't forget to include `dist/index.css` to your app.

```css
@import "onboarding-cvpn/dist/index.css";
```