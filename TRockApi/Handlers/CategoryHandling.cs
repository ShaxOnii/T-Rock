using TRockApi.Handlers.Api;
using TRockApi.Repositories.Api;
using TRockApi.Utils.Errors;

namespace TRockApi.Handlers {
    public class CategoryHandling : ICategoryHandling {

        private readonly ICategoryRepository _categoryRepository;

        public CategoryHandling(ICategoryRepository categoryRepository) {
            _categoryRepository = categoryRepository;
        }

        public Task CreateCategoryAsync(string name, string caption) {
            ValidateCategoryNotExists(name);
            return _categoryRepository.CreateCategoryAsync(name, caption);
        }

        private void ValidateCategoryNotExists(string name) {
            var foundCategory = _categoryRepository.FindByName(name);

            if (foundCategory != null) {
                throw new CategoryAlreadyExistError(name);
            }
        }
    }
}