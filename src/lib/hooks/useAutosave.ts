import React from 'react'

function useAutosave(callback: Function, delay = 1000, deps: string[] = []) {
	const savedCallback = React.useRef() // to save the current "fresh" callback

	// keep callback ref up to date
	React.useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	// create the interval
	React.useEffect(() => {
		// function to call the callback
		function runCallback() {
			savedCallback.current?.()
		}
		// run the interval
		let interval = setInterval(runCallback, delay)
		// clean up on unmount or dependency change
		return () => clearInterval(interval)
	}, [delay, ...deps])
}

export default useAutosave
