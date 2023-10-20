exports.up = async function up(knex) {
  await knex.schema.createTable('categories', table => {
    table.comment('Categories table');
    table
      .increments('id')
      .primary()
      .comment('Automatically generated unique ID');
    table.string('title').notNullable().comment('The title of the category');
    table
      .boolean('isExpanded')
      .defaultTo(false)
      .notNullable()
      .comment('Whether the category is expanded');
  });

  await knex.schema.createTable('links', table => {
    table.comment('Links associated with categories');
    table
      .increments('id')
      .primary()
      .comment('Automatically generated unique ID for links');
    table
      .integer('category_id')
      .notNullable()
      .references('categories.id')
      .onDelete('CASCADE')
      .comment('The id of the category this link belongs to');
    table.string('iconUrl').comment('The URL for the link icon');
    table.string('label').notNullable().comment('The label of the link');
    table.string('url').notNullable().comment('The actual URL of the link');
    table.unique(['category_id', 'label'], {
      indexName: 'category_link_label_composite_index',
    });
  });

  const defaultCategories = [
    { title: 'Communication', isExpanded: true },
    { title: 'Documentation', isExpanded: false },
    { title: 'Source Code Management', isExpanded: false },
    { title: 'Developer', isExpanded: false },
    { title: 'Infrastructure', isExpanded: false },
    { title: 'CI/CD', isExpanded: false },
    { title: 'Clusters', isExpanded: false },
    { title: 'Security', isExpanded: false },
  ];

  await knex('categories').insert(defaultCategories);
};

exports.down = async function down(knex) {
  await knex.schema.dropTable('links');
  await knex.schema.dropTable('categories');
};
