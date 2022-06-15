/*
package com.accounting.pension;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static com.accounting.pension.PensionApplication.namesToString;
import static com.accounting.pension.PensionApplication.transform;
import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static javax.swing.UIManager.getString;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class PensionApplicationTests {

	@Test
	void contextLoads() {
	}
	@Test
	public void toStringShouldReturnPeopleNamesSeparatedByComma() {
		Person sara = new Person("Sara", 4);
		Person viktor = new Person("Viktor", 40);
		Person eva = new Person("Eva", 42);
		List<Person> collection = asList(sara, viktor, eva);
		assertThat(namesToString(collection))
			.isEqualTo("Names: Sara, Viktor, Eva.");
	}


	@Test
	public void transformShouldFlattenCollection() {
		List<List<String>> collection = asList(asList("Viktor", "Farcic"), asList("John", "Doe", "Third"));
		List<String> expected = asList("Viktor", "Farcic", "John", "Doe", "Third");
		assertThat(transform(collection)).hasSameElementsAs(expected);
	}
}
*/
