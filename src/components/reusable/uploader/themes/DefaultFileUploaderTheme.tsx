import uploadFileIcon from '@/assets/img/others/upload.svg';
import FileLists from '../FileLists';
import { Label } from '@/components/ui/label';

const DefaultFileUploaderTheme = ({
	getRootProps,
	getInputProps,
	files,
	// removeFile,
	style,
	// placeholder,
	errors,
	error,
}: any) => {
	return (
		<section>
			<div {...getRootProps({ style })} className='mb-2 cursor-pointer'>
				<input {...getInputProps()} />
				<div className={'flex gap-2 items-center '}>
					<img src={uploadFileIcon} width='42px' height='42px' alt='uploadFileIcon' />
					<div className={'flex gap-1'}>
						<span className={'text-blue-300 text-lg font-bold'}>{`Browse files`}</span>
						<span className={'text-black text-lg'}>{`or Drag your file to start the analysis`}</span>
					</div>
				</div>
			</div>
			{error && <Label className='ml-1.5 text-red-500'>{errors}</Label>}

			<FileLists files={files} />
		</section>
	);
};

export default DefaultFileUploaderTheme;
