import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from '@/components/ui/dialog';

const EDialog = ({
	triggerComponent,
	dialogHeader = null,
	dialogBody = null,
	dialogFooter = null,
	contentClassName = 'max-w-fit',
}: any) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				{triggerComponent ? (
					triggerComponent
				) : (
					<Button variant='outline' className='w-fit'>
						{'open_dialog'}
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className={contentClassName}>
				{dialogHeader && (
					<DialogHeader>
						<DialogTitle>{dialogHeader?.title}</DialogTitle>
						<DialogDescription>{dialogHeader?.description}</DialogDescription>
					</DialogHeader>
				)}
				{dialogBody && dialogBody}
				{dialogFooter && <DialogFooter>{dialogFooter}</DialogFooter>}
			</DialogContent>
		</Dialog>
	);
};

export default EDialog;
