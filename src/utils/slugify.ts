const slugify = (text: string) => {
	return text
		.trim()
		.replace(/[^a-z0-9]+/i, '-')
		.toLowerCase();
};

export { slugify };
