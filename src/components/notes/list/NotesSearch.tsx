import { isSearchMenuOpen } from '@/components/layout/Layout.utils'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { useAtom } from 'jotai'
import { Calculator, Calendar, Smile } from 'lucide-react'
import { useHotkeys } from 'react-hotkeys-hook'

export default function NotesSearch() {
	const [open, setOpen] = useAtom(isSearchMenuOpen)

	useHotkeys('mod+k', () => setOpen(true), {
		preventDefault: true,
		enableOnContentEditable: true,
	})

	return (
		<CommandDialog open={open} onOpenChange={setOpen}>
			<CommandInput placeholder="Type a command or search..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading="Suggestions">
					<CommandItem>
						<Calendar className="mr-2 h-4 w-4" />
						<span>Calendar</span>
					</CommandItem>
					<CommandItem>
						<Smile className="mr-2 h-4 w-4" />
						<span>Search Emoji</span>
					</CommandItem>
					<CommandItem>
						<Calculator className="mr-2 h-4 w-4" />
						<span>Calculator</span>
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	)
}
